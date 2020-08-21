module.exports = {
  siteMetadata: {
    title: 'One Hundred Days of Code',
    description: 'Log for the #100DaysOfCode challange.',
    author: '@tbrlpld',
    homepage: 'https://lpld.io'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        // icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
        // icon: [{ src: 'src/images/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' }, { src: 'src/images/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }] // This path is relative to the root of the site.
        icon: 'src/images/favicon_io/android-chrome-512x512.png'
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-source-git',
      options: {
        name: 'log',
        remote: 'https://github.com/tbrlpld/100-days-of-code'
        // remote: 'https://github.com/kallaway/100-days-of-code'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        gfm: true
      }
    }
  ]
}
