Log100Days (static)
===================

Gatsby site to render a #100DaysOfCode markdown log
(like [this one](https://github.com/kallaway/100-days-of-code)) into a website.

This should work with any other repository that only contains Markdown files.

The repo used as the source can be set in `gatsby-config.js`.
Just change `remote` option in the options for the `gatsby-source-git` plugin.
```js
  ...
  {
    resolve: 'gatsby-source-git',
    options: {
      name: 'log',
      remote: 'https://github.com/kallaway/100-days-of-code'
  }
  ...
```

