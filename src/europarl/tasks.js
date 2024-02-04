import * as cheerio from 'cheerio'
import { fetch } from '../engine/fetcher.js'
import { legislator } from './index.js'

const followUrl = async (item) => {
  const response = await fetch(item.url)

  if (!response) return item

  return { ...item, url: response.request.res.responseUrl }
}

export const tasks = [
  {
    name: 'parse',
    func: (item) => {
      const $ = cheerio.load({ content: item, isDocument: false })
      return legislator($(item))
    }
  },
  { name: 'follow_url', func: followUrl, only: 0 }
]
