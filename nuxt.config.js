export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: ' %s - Lingua Libre',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: 'favicon.ico'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/_variables.scss'],

  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
  },

  styleResources: {
    scss: ['./assets/styles/*.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/Donuts.client.ts',
    '~/plugins/persistedState.client.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/i18n',
  ],

  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang_i18n',
    },
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./lang/en.json'),
        fr: require('./lang/fr.json'),
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.DIST_DIR || '/'
  },

  router: {
    base: process.env.DIST_DIR || '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-url': false,
        'tailwindcss/nesting': {},
        tailwindcss: {},
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
          flexbox: true,
          overrideBrowserslist: ['last 3 versions', '> 1%', 'ie 8', 'ie 7'],
        },
      },
    },
    extractCSS: {
      allChunks: true,
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(s?css|vue)$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
    },
  },
}
