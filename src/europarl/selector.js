export const Selector = {
  europarl: {
    legislator: {
      items: 'div[id^="member-block"]',
      name: '.erpl_title-h4',
      url: 'a',
      partyGroup: '.sln-additional-info:nth(0)',
      country: '.sln-additional-info:nth(1)',
      image: 'img[loading="lazy"]'
    }
  }
}
