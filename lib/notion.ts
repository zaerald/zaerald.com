import {Client} from "@notionhq/client"
import {QueryDatabaseResponse} from "@notionhq/client/build/src/api-endpoints"

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function getMyImpossibleList(): Promise<QueryDatabaseResponse> {
  const db = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
  }) as QueryDatabaseResponse

  return db
}

