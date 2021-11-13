import type {NextPage} from 'next'

import Header from '@/components/Header'
import {getMyImpossibleList} from '../lib/notion'
import {MilList, MilModel} from '@/lib/types'
import {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints'

interface ListProps {
  myImpossibleList: MilList,
}

export async function getServerSideProps() {
  let myImpossibleList = {}

  try {
    const fetchedList: QueryDatabaseResponse = await getMyImpossibleList()

    myImpossibleList = fetchedList.results
      .map(it => it.properties)
      .reduce((acc: MilList, val: any) => {
        const key = val.Category.select.id
        let values = [val]

        if (acc[key]) {
          values = [
            ...acc[key]?.values || [],
            ...values,
          ]
        }

        return {
          ...acc,
          [key]: {
            category: {
              id: val.Category.select.id,
              name: val.Category.select.name,
            },
            values,
          }
        }
      },
        {}
      )

  } catch (error) {
    console.error(`Something went wrong: ${error}`)
  }

  return {props: {myImpossibleList}}
}

const List: NextPage<ListProps> = ({myImpossibleList}: ListProps) => {

  console.log()

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
          {Object.entries(myImpossibleList).map(([key, value]: [string, MilModel]) =>
            <li key={key}>
              <h2 className="inline-block ml-3 mb-4 mt-14 text-xl md:text-3xl lg:text-4xl border-b-8 border-accent lowercase">{value.category.name}</h2>
              <ul className="list-disc">
                {value.values.map((item, index) =>
                  <li key={`${item.length} ${index}`} className="text-xl">
                  {item.Name.title && item.Name.title[0].plain_text}
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>

        <p className="mt-32 text-center">Inspired by <a href="https://twitter.com/TomFrankly" target="_blank" rel="noopener noreferrer">@TomFrankly</a>&apos;s <a href="https://collegeinfogeek.com/about/meet-the-author/my-impossible-list" target="_blank" rel="noopener noreferrer">list</a> and <a href="https://twitter.com/joelrunyon" target="_blank" rel="noopener noreferrer">@joelrunyon</a>&apos;s <a href="https://impossiblehq.com/impossible-list/" target="_blank" rel="noopener noreferrer">list</a>.</p>

      </div>
    </>
  );
}

export default List

