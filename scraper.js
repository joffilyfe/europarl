import { Scraper } from './src/engine/index.js'
import { legislatorUrls, legislator } from './src/europarl/index.js'

export const scrapeEULegislators = async () => {
  const targets = await Scraper({
    targets: ['https://www.europarl.europa.eu/meps/en/full-list/all'],
    callback: legislatorUrls,
    size: 1
  })

  return await Scraper({ targets: targets[0].slice(0, 1), size: 15, callback: legislator })
}
