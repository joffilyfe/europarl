import * as cheerio from 'cheerio'
import { legislatorHTML } from '../fixtures'
import { legislator } from '../../src/europarl'


describe('extractLegislatorInfo', () => {
  const $ = cheerio.load(legislatorHTML)
  const container = $('.erpl_member-list-item')
  const expected = {
    name: 'Magdalena ADAMOWICZ',
    lastName: 'ADAMOWICZ',
    partyGroup: 'Group of the European People\'s Party (Christian Democrats)',
    country: 'Poland',
    image: 'https://www.europarl.europa.eu/mepphoto/197490.jpg',
  }

  it('extracts her name', () => {
    expect(legislator(container).name).toBe(expected.name)
  })

  it('extracts her lastName', () => {
    expect(legislator(container).lastName).toBe(expected.lastName)
  })

  it('extracts her partyGroup', () => {
    expect(legislator(container).partyGroup).toBe(expected.partyGroup)
  })

  it('extracts her country', () => {
    expect(legislator(container).country).toBe(expected.country)
  })

  it('extracts her image', () => {
    expect(legislator(container).image).toBe(expected.image)
  })

})
