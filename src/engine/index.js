import * as cheerio from 'cheerio'
import { Selector } from '../europarl/selector.js'
import { fetch } from './fetcher.js'
import { logger } from './logger.js'

/**
 * Asynchronously scrapes data from a specified target URL and applies a series of tasks to each item found.
 *
 * @param {Object} options - The options for the scraper.
 * @param {string} options.target - The target URL to scrape data from.
 * @param {Array<Task>} [options.tasks=[]] - An array of tasks to apply to each scraped item. Each task
 *        is an object that must contain a `name` (for logging) and a `func` (the transformation function to apply).
 *        Optionally, a task can include an `only` property to specify that the task should only be applied to the item
 *        at that specific index.
 * @param {Function} options.fetcher - A function that acceps an URL and make a HTTP call returning its response
 *        result as String.
 * @returns {Promise<Array>} A Promise that resolves to an array of the processed items. Each item has undergone
 *          the transformations specified by the `tasks` parameter.
 *
 * @example
 * // Define a task to capitalize the text content of each item
 * const capitalizeTask = {
 *   name: 'Capitalize Text',
 *   func: (item) => {
 *     const text = $(item).text();
 *     const capitalizedText = text.toUpperCase();
 *     $(item).text(capitalizedText);
 *     return item;
 *   }
 * };
 *
 * // Scrape data from a URL and apply the capitalizeTask to each item
 * Scraper({ target: 'http://example.com', tasks: [capitalizeTask] })
 *   .then(processedItems => {
 *     // Work with processed items here
 *   });
 */
export const Scraper = async ({ target, tasks = [], fetcher = fetch }) => {
  const response = await fetcher(target)

  if (!response) {
    logger.error('Something wrong.')
    return
  }

  const $ = cheerio.load(response.data || '')
  const items = $(Selector.europarl.legislator.items).toArray()

  const promises = items.map((item, index) => {
    for (const task of tasks) {
      if (index == task.only || task.only == undefined) {
        logger.debug(`Apply task '${task.name}' at '${index}'.`)
        item = task.func(item)
      }
    }

    return item
  })

  return await Promise.all(promises)
}
