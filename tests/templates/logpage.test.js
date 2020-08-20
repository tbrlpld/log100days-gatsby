/* eslint-env jest */

const { fixRelativeLinksForGatsby } = require('../../src/templates/logpage.jsx')
const { fixSlugInLocalMarkdownLinks } = require('../../src/templates/logpage.jsx')
const { processRawMarkdownHtml } = require('../../src/templates/logpage.jsx')

/*
Solve links between pages. Because Gatsby creates every page as its own directory
with a `index.href` in it, the URL have a trailing `/`.

This also means that the relative markdown links that are going up are wrong.
E.g. the `/intl/de/README.md` defines a link as  `../es/README.md`. This does
point to the markdown file `/intl/es/README.md` correctly. But when the page is
build with Gatsby, then the links is looking for `/intl/de/es/README.md` because
 the current URL position is a directory out of which we have to navigate.

This means these links need to be prepended with another `../` to compensate for
that.

Also, relative links to sibling files are not working. E.g. when in `/README.md`
a markdown link may define a link to the file `rules.md`. Now this works when
dealing with files, because this is a relative link (because it does not start
with a `/`). But because of the Gatsby structure the URL is a directory and the
link points to `/REAMDE.md/rules.md`. I guess this would also be solved by
prepending `../`.

So I will have to parse all the links and update the href attribute. Everything
that is not an absolute path (starting with `/` , `http`) needs to be prepended
with `../` to navigate out of the current directory.
*/
describe('Fix relative markdown links for Gatsby', () => {
  it('adds ../ to sibling link.', () => {
    const href = 'sibling.md'
    const fixedHref = fixRelativeLinksForGatsby(href)
    expect(fixedHref).toBe('../sibling.md')
  })

  it('adds ../ to local relative link to file in other directory.', () => {
    const href = '../other-parent/child.md'
    const fixedHref = fixRelativeLinksForGatsby(href)
    expect(fixedHref).toBe('../../other-parent/child.md')
  })

  it('leaves absolute local link as is.', () => {
    const href = '/sibling.md'
    const fixedHref = fixRelativeLinksForGatsby(href)
    expect(fixedHref).toBe('/sibling.md')
  })

  it('leaves external link as is.', () => {
    const href = 'http://example.com'
    const fixedHref = fixRelativeLinksForGatsby(href)
    expect(fixedHref).toBe('http://example.com')
  })

  it('leaves external link (https) as is.', () => {
    const href = 'https://example.com'
    const fixedHref = fixRelativeLinksForGatsby(href)
    expect(fixedHref).toBe('https://example.com')
  })

  it('leaves mail link as is.', () => {
    const href = 'mailto:somebody@example.com'
    const fixedHref = fixRelativeLinksForGatsby(href)
    expect(fixedHref).toBe('mailto:somebody@example.com')
  })

  it('leaves tel link as is.', () => {
    const href = 'tel:+123456789'
    const fixedHref = fixRelativeLinksForGatsby(href)
    expect(fixedHref).toBe('tel:+123456789')
  })
})

describe('Update local markdown file name to slug definition', () => {
  it('removes .md and adds trailing / to sibling link.', () => {
    const href = 'sibling.md'
    const fixedHref = fixSlugInLocalMarkdownLinks(href)
    expect(fixedHref).toBe('sibling/')
  })

  it('removes .md from sibling link already ending with /.', () => {
    const href = 'sibling.md/'
    const fixedHref = fixSlugInLocalMarkdownLinks(href)
    expect(fixedHref).toBe('sibling/')
  })

  it('leaves external link as is (even if ending in .md).', () => {
    const href = 'http://example.com/site.md'
    const fixedHref = fixSlugInLocalMarkdownLinks(href)
    expect(fixedHref).toBe('http://example.com/site.md')
  })

  it('leaves external link (https) as is (even if ending in .md).', () => {
    const href = 'https://example.com/site.md'
    const fixedHref = fixSlugInLocalMarkdownLinks(href)
    expect(fixedHref).toBe('https://example.com/site.md')
  })

  it('leaves mail link as is (even if ending in .md).', () => {
    const href = 'mailto:somebody@example.md'
    const fixedHref = fixSlugInLocalMarkdownLinks(href)
    expect(fixedHref).toBe('mailto:somebody@example.md')
  })

  it('leaves tel link as is.', () => {
    const href = 'tel:+123456789'
    const fixedHref = fixSlugInLocalMarkdownLinks(href)
    expect(fixedHref).toBe('tel:+123456789')
  })
})

describe('Process raw markdown HTML', () => {
  it('fixes converts relative markdown file links to Gatsby slugs', () => {
    const html = '<div><a href="sibling.md"></a></div>'
    const processedHTML = processRawMarkdownHtml(html)
    expect(processedHTML).toContain('href="../sibling/"')
    expect(processedHTML).not.toContain('href="sibling.md"')
  })
})
