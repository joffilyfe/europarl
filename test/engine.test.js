import { jest } from '@jest/globals'
import { Scraper } from '../src/engine/index.js'
import { logger } from '../src/engine/logger.js'
import { legislatorHTML } from './fixtures/index.js'

jest.unstable_mockModule('cheerio', () => ({
  load: jest.fn(() => ({
    toArray: jest.fn(() => ['item1', 'item2']),
  }))
}))

jest.unstable_mockModule('../src/engine/fetcher.js', () => ({
  __esModule: true,
  fetch: jest.fn()
}))

let fetch
let cheerio

describe('Scraper function', () => {
  beforeEach(async () => {
    cheerio = await import('cheerio')
    fetch = (await import('../src/engine/fetcher.js')).fetch

    cheerio.load.mockClear()
    fetch.mockClear()
  })

  it('should fetch data from the target URL', async () => {
    fetch.mockResolvedValueOnce({
      data: '<div>Mock HTML Content</div>',
    })

    await Scraper({ target: 'http://example.com', fetcher: fetch })
    expect(fetch).toHaveBeenCalledWith('http://example.com')
  })

  it('should log an error and return undefined if fetch fails', async () => {
    fetch.mockResolvedValueOnce(null)
    const loggerSpy = jest.spyOn(logger, 'error').mockImplementation(() => { })

    await Scraper({ target: 'http://example.com', fetcher: fetch })
    expect(loggerSpy).toHaveBeenCalledWith('Something wrong.')
    loggerSpy.mockRestore()
  })

  it('should apply tasks to each item and return processed items', async () => {
    fetch.mockResolvedValueOnce({
      data: legislatorHTML,
    })
    const mockFunc = jest.fn(item => item + '-processed')

    const tasks = [{ name: 'Process Item', func: mockFunc }]
    const result = await Scraper({ target: 'http://example.com', tasks, fetcher: fetch })

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(result.length).toBe(1)
  })
})

