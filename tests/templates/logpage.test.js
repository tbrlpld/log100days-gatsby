/* eslint-env jest */

const { fixRelativeLinksForGatsby } = require('../../src/templates/logpage.jsx')

describe('Fix relative markdown links for Gatsby', () => {
  it('adds ../ to sibling link', () => {
    const html = '<div><a href="sibling.md"></a></div>'
    const fixedHtml = fixRelativeLinksForGatsby(html)
    expect(fixedHtml).toContain('href="../sibling.md"')
    expect(fixedHtml).not.toContain('href="sibling.md"')
  })

  it('leaves absolute local link as is', () => {
    const html = '<div><a href="/sibling.md"></a></div>'
    const fixedHtml = fixRelativeLinksForGatsby(html)
    expect(fixedHtml).toContain('href="/sibling.md"')
  })
})
