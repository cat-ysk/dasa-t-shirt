export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "#湊あくあクソダサTシャツ選手権 ちょう簡単画像作りマシーン",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    script: [{ src: "https://twemoji.maxcdn.com/v/latest/twemoji.min.js" }],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://cdn.materialdesignicons.com/4.2.95/css/materialdesignicons.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/earlyaccess/nikukyu.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/earlyaccess/hannari.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Sawarabi+Gothic"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/earlyaccess/nicomoji.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "~/plugins/pixi",
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    "@nuxtjs/bulma"
  ],
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
