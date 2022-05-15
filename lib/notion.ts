import { Client } from '@notionhq/client'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { formatDate } from './utils'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function getMyImpossibleList(): Promise<QueryDatabaseResponse> {
  const db = (await notion.databases.query({
    database_id: process.env.NOTION_IMPOSSIBLE_LIST_DATABASE_ID || '',
  })) as QueryDatabaseResponse

  return db
}

export async function fetchSmallWins(startCursor?: string): Promise<QueryDatabaseResponse> {
  const startDate = new Date()
  const endDate = new Date()
  startDate.setDate(endDate.getDate() - 100)

  const query = {
    database_id: process.env.NOTION_SMALL_WINS_DATABASE_ID || '',
    filter: {
      and: [
        {
          property: 'Date',
          date: {
            on_or_after: formatDate(startDate),
          },
        },
        {
          property: 'Date',
          date: {
            on_or_before: formatDate(endDate),
          },
        },
      ],
    },
    start_cursor: startCursor,
  }

  return (await notion.databases.query(query)) as QueryDatabaseResponse
}
