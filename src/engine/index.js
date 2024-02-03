import axios from 'axios'
import PQueue from 'p-queue'
import delay from 'delay'
import { createLogger, transports } from 'winston'

const POOL_SIZE = 2

const logger = createLogger({
  transports: [new transports.Console()]
});

const ScraperConfig = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
  },
  redirect: 'follow',
  maxRedirects: 5,
  timeout: 10000,
}

/*
* fetch(url)
* Access a given URL while wait for its response.
* When TOO MANY requests happened it waits for 2 seconds (backoff to be added)
* then it recursively calls itself until the response is positive
*/
const fetch = async (url) => {
  let response

  try {
    logger.info(`Scraping '${url}'.`)
    response = await axios.get(url, ScraperConfig)
  } catch (error) {
    if (error.response.status == 429 || error.response.status == 503) {
      logger.info(`Retrying: '${url}'.`)
      await delay(5000)
      response = await fetch(url)
    } else {
      console.log(error)
    }
  }

  return response
}

export const Scraper = async ({ targets = [], callback, size = POOL_SIZE }) => {

  const queue = new PQueue({ concurrency: size });
  const results = []

  while (targets.length > 0) {
    // dequeue targets
    const target = targets.shift()

    queue.add(async () => {
      if (!target) return

      const response = await fetch(target)

      if (response)
        results.push(await callback(response.data, response.request.res.responseUrl))
    })
  }

  await queue.onIdle()
  logger.info('Scrape finished.')

  return results
}
