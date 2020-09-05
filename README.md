Log100Days (static)
===================

Gatsby site to render a #100DaysOfCode markdown log (like [this one](https://github.com/kallaway/100-days-of-code)) into a website.


## Usage

This project uses Gatsby to generate a static website based on a repository containing markdown files.

![Log100Days Screenshot](/readme/log100days-gatsby.png)

My use case is to render the [log repository](https://github.com/tbrlpld/100-days-of-code) that I have created during the #100DaysOfCode challenge into a website that can be consumed more pleasantly than a raw markdown files.
The process should work basically the same for any other repository that only contains markdown files.

The top-level files in the markdown repository are available as the top navigation.
The `README.md` is used as the landing page.
Other markdown files can be linked to in the top level files with local links.

You can link to the markdown files with their normal names (e.g. `[My first article](/articles/first-article.md)`).
The conversion to HTML links is handled during build.

To configure the title at the top of the app, change the `title` property in the `siteMetadata` section in the `gatsby-config.js`.

```js
  ...
  siteMetadata: {
    title: 'One Hundred Days of Code',
    description: 'Log for the #100DaysOfCode challange.',
    author: '@tbrlpld',
    homepage: 'https://lpld.io'
  },
  ...
```

The markdown repo that is used as the source is configured through the `remote` option in the options for the `gatsby-source-git` plugin.

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

## Installation

The installation instructions assume that you have Node.js and `npm` installed.
You can follow [this article](https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/) by [Tania Rascia](https://github.com/taniarascia) to install both tools.

Clone the repository and change into the project directory.

```shell
$ git clone https://github.com/tbrlpld/log100days-gatsby.git
$ cd log100days-gatsby
```

Install the dependencies.

```shell
$ npm install
```

That's it.

## Development

You can now run the Gatsby development server.

```shell
$ npm start
```

After a few seconds the development version should be available at `http://localhost:8000/`.

If you update the configuration to point toward a different repo you will need to restart the development server.

## Build

To build the optimized production version of the site run:
```shell
$ npm run build
```

This will create a `public` directory in the project root and place all static files for the site in them.

To make the production version available on localhost run:
```shell
$ npm run serve
```

The production version of the site should now be available at `http://localhost:9000/`.


## Hosting

I am hosting my [live version of the project](https://log100days.lpld.io) on [Netlify.com](https://www.netlify.com).
It's free for small projects and builds automatically when the code repository is updated.

But the kicker is that it also comes with the option to setup a build webhook.
So you get a special URL that triggers a rebuild of the site.

Why is this interesting?
Because the content for the site does not live this code repository the site would not rebuild when the content is updated.

To still get the deployed site to be rebuild when the markdown (content) repo is updated you can use a [simple Github workflow](https://github.com/tbrlpld/100-days-of-code/blob/master/.github/workflows/update-netlify.yml).
This GitHub workflow needs to be added to the content repo.
It does only to one thing, and that is to send and empty POST request to the Netlify build webhook URL.

To avoid malicious actors from abusing you build webhook you are going to want to use the GitHub secret to define that value.
Then you reference the secret in the workflow file with `${{secrets.NETLIFY_BUILD_HOOK_URL}}` (or what ever name you have given that secret).

That's it.
Now the site will be automatically rebuild when the code or the content changes.