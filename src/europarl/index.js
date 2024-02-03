import { Selector } from './selector.js'

export const legislator = (item) => {
  const name = item.find(Selector.europarl.legislator.name).text(),
    lastName = name.split(' ').slice(1).join(' '),
    partyGroup = item.find(Selector.europarl.legislator.partyGroup).text(),
    country = item.find(Selector.europarl.legislator.country).text(),
    image = item.find(Selector.europarl.legislator.image).attr('src'),
    url = item.find(Selector.europarl.legislator.url).attr('href')

  return { name, lastName, partyGroup, country, image, url }
}
