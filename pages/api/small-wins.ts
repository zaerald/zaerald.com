import { fetchSmallWins } from '@/lib/notion'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data?: QueryDatabaseResponse
  error?: string
}

const smallWins = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    query: { cursor },
    method,
  } = req

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed.' })
  } else if (typeof cursor === 'string') {
    res.status(200).json({ data: await fetchSmallWins(cursor) })
  } else {
    res.status(400).json({ error: 'Invalid cursor.' })
  }
}

export default smallWins
