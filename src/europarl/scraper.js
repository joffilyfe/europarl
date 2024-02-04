import { Scraper } from '../engine/index.js'
import { tasks } from './tasks.js'

export const EntryPoint = async () => {
  return await Scraper({ target: 'https://www.europarl.europa.eu/meps/en/full-list/all', tasks })
}

console.log(JSON.stringify(await EntryPoint()))


