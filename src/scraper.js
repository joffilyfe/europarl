import { Scraper, extractEUlegislatorsLinks } from './engine/index.js'

export const scrapeEULegislators = async () => {
  const targets = await extractEUlegislatorsLinks('https://www.europarl.europa.eu/meps/en/full-list/all')

  return await Scraper({ targets: targets.slice(0, 1) })
}


// console.log(await scrapeEULegislators())


const targets = await Scraper({
  targets: ['https://www.europarl.europa.eu/meps/en/full-list/all'],
  callback: extractEUlegislatorsLinks
})

console.log(targets)
