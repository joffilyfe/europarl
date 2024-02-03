export const Selector = {
  europarl: {
    legislator: {
      block: 'div[id^="member-block"]',
      name: '.sln-member-name',
      image: '.erpl_image-frame span img',
      link: 'div[id^="member-block"] a',
      partyGroup: '.erpl_title-h3:nth(0)',
      country: '#presentationmep > div > div:nth-child(2) > div > div > div.erpl_title-h3.mt-1.mb-1'
    }
  }
}
