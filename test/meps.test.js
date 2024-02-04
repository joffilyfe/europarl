import { scrapeEULegislators } from '../scraper.js'

test('legislators', async () => {
  const legislators = await scrapeEULegislators()

  // This number can fluctuate, feel free to update the test if it's the case.
  expect(Array.isArray(legislators)).toBeTruthy()
  expect(legislators.length).toBe(705)

  const first = legislators[0]
  expect(first.name).toBe('Magdalena ADAMOWICZ')
  expect(first.lastName).toBe('ADAMOWICZ')
  expect(first.partyGroup).toBe('Group of the European People\'s Party (Christian Democrats)')
  expect(first.country).toBe('Poland')
  expect(first.url).toBe('https://www.europarl.europa.eu/meps/en/197490/MAGDALENA_ADAMOWICZ/home')
  expect(first.image).toBe('https://www.europarl.europa.eu/mepphoto/197490.jpg')
})
