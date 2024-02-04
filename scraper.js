import { Scraper } from './src/engine'
import { tasks } from './src/europarl/tasks'

export const scrapeEULegislators = async () => {
  return await Scraper({ target: 'https://www.europarl.europa.eu/meps/en/full-list/all', tasks })
}
