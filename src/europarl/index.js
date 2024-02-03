import * as cheerio from 'cheerio'
import { Selector } from '../constans/selectors.js'

const sanitize = (el) => {
    return el.text().split(/\s+/).join(' ').trim()
}

const retrievePartyAndCountry = (text) => {
    const regex = /(?<country>.*) - (?<partyGroup>.*) .*/g
    const match = regex.exec(sanitize(text))

    if (!match) return {}

    return match.groups
}

export const legislator = async (html, url) => {
    const $ = cheerio.load(html || '')
    const name = sanitize($(Selector.europarl.legislator.name))
    const lastName = name.split(' ').slice(1).join(' ')
    const image = $(Selector.europarl.legislator.image).attr('src')
    const partyGroup = sanitize($(Selector.europarl.legislator.partyGroup))
    const country = retrievePartyAndCountry($(Selector.europarl.legislator.country))?.country

    return {
        name,
        lastName,
        image,
        url,
        partyGroup,
        country
    }
}

export const legislatorUrls = async (html) => {
    const $ = cheerio.load(html || '')

    return $(Selector.europarl.legislator.link)
        .map((_, item) => item.attribs.href).toArray()
}
