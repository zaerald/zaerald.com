import Header from '@/components/Header'
import { fetchSmallWins as fetchSmallWins } from '@/lib/notion'
import { DateProperty, SmallWinDatapoint } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import styles from './stats.module.css'

interface StatsProps {
  initialSmallWins: string[]
  initialCursor: string
}

const hasDateRecordProperty = (value: unknown): value is DateProperty => {
  return typeof value === 'object' && value !== null && 'Date' in value
}

const parseSmallWins = (fetchedSmallWins: QueryDatabaseResponse): string[] => {
  const isString = (v: string | false): v is string => typeof v === 'string'

  return fetchedSmallWins.results
    .map((it) => 'properties' in it && it.properties)
    .map((it) => hasDateRecordProperty(it) && it.Date.date.start)
    .filter(isString)
}

const convertToDatapoint = (smallWins: string[]): SmallWinDatapoint[] => {
  if (smallWins === undefined) return []

  const smallWinsMap = smallWins.reduce<Record<string, number>>((acc, dateValue) => {
    if (!dateValue) return acc

    if (acc[dateValue]) {
      acc[dateValue] += 1
    } else {
      acc[dateValue] = 1
    }

    return acc
  }, {})

  return Object.entries(smallWinsMap).map(([k, v]) => ({ date: k, count: v }))
}

export async function getServerSideProps() {
  let fetchedSmallWins: QueryDatabaseResponse = await fetchSmallWins()

  let initialSmallWins = parseSmallWins(fetchedSmallWins)

  return { props: { initialSmallWins, initialCursor: fetchedSmallWins.next_cursor } }
}

const Stats: NextPage<StatsProps> = ({ initialSmallWins, initialCursor }: StatsProps) => {
  const [datapoints, setDatapoints] = useState<string[]>(initialSmallWins)

  const getStartDate = (): string => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 100)

    return formatDate(startDate)
  }

  const getEndDate = (): string => {
    return formatDate(new Date())
  }

  const getLabel = (count: number): string => {
    return count <= 1 ? 'win' : 'wins'
  }

  const classForValue = (value: SmallWinDatapoint) => {
    if (value == null) return styles.heatmapLevelZero
    else if (1 <= value.count && value.count <= 2) return styles.heatmapLevelOne
    else if (3 <= value.count && value.count <= 4) return styles.heatmapLevelTwo
    else if (5 <= value.count) return styles.heatmapLevelThree
    else return styles.heatmapValue
  }

  useEffect(() => {
    const fetchSmallWins = async () => {
      let cursor = initialCursor

      while (cursor) {
        const response = await fetch(`/api/small-wins?cursor=${cursor}`)
        const { data } = await response.json()

        cursor = data.next_cursor

        setDatapoints((datapoints) => [...datapoints, ...parseSmallWins(data)])
      }
    }

    fetchSmallWins()
  }, [initialSmallWins, initialCursor])

  const transformedDatapoints = convertToDatapoint(datapoints)

  return (
    <>
      <Header />
      <div className="pt-32 md:pt-36">
        <div className="w-3/5 mx-auto">
          <h1 className="inline-block mb-10 text-3xl text-center border-b-8 md:4 md:text-6xl lg:text-7xl border-accent">
            small wins
          </h1>
          <CalendarHeatmap
            startDate={getStartDate()}
            endDate={getEndDate()}
            classForValue={classForValue}
            titleForValue={(value: SmallWinDatapoint) =>
              value != null && 'count' in value ? `${value.count} ${getLabel(value.count)} ${value.date} ` : `No Data`
            }
            values={transformedDatapoints}
          />
        </div>
      </div>
    </>
  )
}

export default Stats
