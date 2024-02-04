import axios from 'axios'
import delay from 'delay'
import { logger } from './logger.js'

const ScraperConfig = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
  },
  redirect: 'follow',
  maxRedirects: 5,
  timeout: 10000,
}

/**
 * Asynchronously fetches data from the specified URL with an optional delay
 * and retry mechanism for handling rate limits or server errors.
 *
 * This custom fetch function wraps around Axios to make HTTP GET requests.
 * It supports an optional delay before making the request, which can be useful for throttling requests.
 *
 * If the server responds with a 429 (Too Many Requests) or a 503 (Service Unavailable) status code,
 * the function automatically retries the request after a 5-second delay.
 *
 * @param {string} url - The URL to fetch data from. If no URL is provided, the function
 *         immediately returns `undefined`.
 * @param {number} [time=0] - The delay in milliseconds before making the fetch request.
 *         Defaults to 0, meaning no delay.
 * @returns {Promise<Object|undefined>} A Promise that resolves to the Axios response object.
 *
 * @example
 * // Fetch data from a URL with no delay
 * fetch('http://example.com/api/data')
 *   .then(response => {
 *     console.log(response.data);
 *   })
 *   .catch(error => {
 *     console.error('Fetch error:', error);
 *   });
 *
 * @example
 * // Fetch data from a URL with a 2-second delay before the request
 * fetch('http://example.com/api/data', 2000)
 *   .then(response => {
 *     console.log(response.data);
 *   })
 *   .catch(error => {
 *     console.error('Fetch error:', error);
 *   });
 */
export const fetch = async (url, time = 0) => {
  let response

  if (!url) return
  if (time > 0) await delay(time)

  try {
    logger.info(`Scraping '${url}'.`)
    response = await axios.get(url, ScraperConfig)
  } catch (error) {
    if (error.response && (error.response.status == 429 || error.response.status == 503)) {
      logger.info(`Retrying: '${url}'.`)
      response = await fetch(url, 5000)
    }
  }

  return response
}
