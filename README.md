# lingua-libre record checker

```
Student project
Digital Campus Workshop 2021
```
![](https://img.shields.io/badge/STUDENT-DC__PARIS-red)
![](https://img.shields.io/badge/tailwind-v2.2.16-blue)
![ts](https://flat.badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![](https://img.shields.io/badge/tailwind-v2.2.16-blue)
![](https://img.shields.io/badge/Nuxt-v2.15.8-green)

## Features
- Fetch outside data with axios
- Add a single tag to a record
- Play one audio record
- Autoplay mode for all audio records
- Change speed rate for all audio players
- Set delay (ms) between audios in autoplay mode
- Shortcuts keyboard to play/pause (space)
- Shortcuts keyboard to replay active audio (arrow left)
- Using Vuex store to manage shared values across whole application and accessible for components
- Stockage persistant in localStorage for Vuex states
- Generate an export in XML format containing the records checked with a tag applied


## Browser Compatibility
Tested in the following browsers/versions:

- Firefox 25+
- Chrome 22+
- Firefox for android* 57+
- Chrome for android* 63+
- Microsoft Edge 12+
- Safari 11+
- Opera 18+

## Live demo 

- Serve static on Plateform As A Service at root `/`
  - [See the demo online](https://interface-lingua-libre.vercel.app)
- Serve static on hosted Apache in subdirectory `/lingua-libre/`
  - [See the demo online](http://projet.tekmedias.com/lingua-libre/)
  
## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).


## How to host the project

### Using node server to deploy
```
npm run build && npm run 
```

### Build a static version 
```
npm run generate 
```

If you need to host the project on a subdirectory (ex: lingua-libre), you'll need to define on `.env` file a variable named `DIST_DIR` 
```
# .env file
DIST_DIR=/lingua-libre
```

by default if the `DIST_DIR` is missing, the default value will be `/`

Then generate your project : `npm run generate`

The configuration of nuxt needed to setup the value for the router and also for axios package to enable this feature.
```javascript
// nuxt.config.js
{
  ...
  axios: {    
    baseURL: process.env.DIST_DIR || '/'
  },
  router: {
    base: process.env.DIST_DIR || '/'
  },
  ...
}
```

## Setup Tailwind

Link to the official documentation
[https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

## Using translation (i18n)

Translation files are located in  `📁/lang`

- 📄`lang/en.json`
- 📄`lang/fr.json`

How to use i18n translation inside whole project (components or pages):

```json
// from lang/en.json
{
  "GLOBAL": {
    "PREVIOUS": "Previous"
  }
}

// from lang/fr.json
{
  "GLOBAL": {
    "PREVIOUS": "Précédent"
  }
}
```

Note : use the same key for both translation files, but change the value

```vue
// inside src/ui/components/test.vue
<template>
  <div>
    <h1>{{ $t('GLOBAL.PREVIOUS'}}</h1>
  </div>
</template>

// if i18n locale is setup to "french", it will returns :
<h1>Précédent</h1>

// if i18n locale is setup to "english", it will returns :
<h1>Previous</h1>
```

#### How to manage plural form :

```json
// from lang/en.json
{
  "GLOBAL": {
    "RECORD": "record | records"
  }
}

// from src/app/lang/fr.json
{
  "GLOBAL": {
    "RECORD": "Enregistrement | Enregistrements"
  }
}
```

```vue
// inside src/ui/components/test.vue
<template>
  <div>
    <h1>{{ $tc('GLOBAL.RECORD', 1}}</h1> // will return singular form
    <h1>{{ $tc('GLOBAL.RECORDS', 2}}</h1> // will return plural form
  </div>
</template>
```
