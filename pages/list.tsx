import type { NextPage } from 'next'

import { getMyImpossibleList } from '../lib/notion'
import { MilList, MilModel } from '@/lib/types'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

import Header from '@/components/Header'
import SimpleLink from '@/components/SimpleLink'
import MilItem from '@/components/MilItem'

interface ListProps {
  myImpossibleList: MilList
}

export async function getServerSideProps() {
  let myImpossibleList = {}

  try {
    const fetchedList: QueryDatabaseResponse = await getMyImpossibleList()

    myImpossibleList = fetchedList.results
      .map((it) => it.properties)
      .reduce((acc: MilList, val: any) => {
        const key = val?.Category?.select?.id
        if (!key) return { ...acc }

        let values = [val]

        if (acc[key]) {
          values = [...(acc[key]?.values || []), ...values]
        }

        return {
          ...acc,
          [key]: {
            category: {
              id: val.Category.select.id,
              name: val.Category.select.name,
            },
            values,
          },
        }
      }, {})
  } catch (error) {
    console.error(`Something went wrong: ${error}`)
  }

  return { props: { myImpossibleList } }
}

const List: NextPage<ListProps> = ({ myImpossibleList }: ListProps) => {
  return (
    <>
      <Header />
      <div className="w-4/5 md:w-3/4 lg:w-2/4 mx-auto mb-40 pt-36">
        <div className="text-center">
          <h1 className="inline-block mb-10 md:4 text-center text-3xl md:text-6xl lg:text-7xl border-b-8 border-accent">
            my impossible list
          </h1>
        </div>
        <div />

        <ul>
          {Object.entries(myImpossibleList).map(([key, value]: [string, MilModel]) => (
            <li key={key}>
              <h2 className="inline-block ml-3 mb-4 mt-14 text-xl md:text-3xl lg:text-4xl border-b-8 border-accent lowercase">
                {value.category.name}
              </h2>
              <ul className="list-disc">
                {value.values.map((item, index) => (
                  <MilItem key={`${item.length} ${index}`} item={item} />
                ))}
              </ul>
            </li>
          ))}
          {Object.values(myImpossibleList).length === 0 && (
            <li className="text-center mt-8">Unable to fetch list 😢.</li>
          )}
        </ul>

        <p className="mt-32 text-center">
          Inspired by <SimpleLink link="https://twitter.com/TomFrankly" text="@TomFrankly" />
          &apos;s
          <SimpleLink link="https://collegeinfogeek.com/about/meet-the-author/my-impossible-list" text=" list" /> and
          <SimpleLink link="https://twitter.com/joelrunyon" text=" @joelrunyon" />
          &apos;s
          <SimpleLink link="https://impossiblehq.com/impossible-list" text=" list" />.
        </p>
      </div>
    </>
  )
}

export default List
