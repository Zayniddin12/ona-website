// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: ["@/assets/styles/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/robots",
    [
      "@pinia/nuxt",

      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    "@nuxt/image",
  ],
  sitemap: [
    {
      path: "/sitemap.xml",
      hostname: "https://ona-foundation.uz",
      exclude: [
        "/news",
        "/about",
        "/contact",
        "/posts",
        "/partners",
        "/help",
        "/programs",
        "/playground",
      ],
      defaults: {
        changefreq: "daily",
        priority: 1,
        lastmod: new Date(),
      },
    },
  ],

  robots: {
    rules: {
      UserAgent: "*",
      Allow: ["/about", "/contact", "news"],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: "localhost",
    },
  },
  devServerHandlers: [],
  nitro: {
    serveStatic: true,
  },
  experimental: {
    payloadExtraction: false,
  },
  //    pageTransition: { name: "layout", mode: "out-in" },
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.svg",
        },
        { rel: "canonical", href: "https://ona-website.uicgroup.tech/" },
      ],
      meta: [
        {
          hid: "og:image",
          property: "og:image",
          content: "/images/og-image.jpg",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Ona Foundation - фонд, оказывающий поддержку женщинам.",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Ona Foundation — республиканский общественный фонд, работающий с августа 2021 года. Основная цель фонда заключается во всесторонней поддержке женщин, оказавшихся в сложной жизненной ситуации.",
        },
        {
          name: "description",
          content:
            "Ona Foundation — республиканский общественный фонд, работающий с августа 2021 года. Основная цель фонда заключается во всесторонней поддержке женщин, оказавшихся в сложной жизненной ситуации.",
        },
      ],
      script: [
        {
          src: "https://code.responsivevoice.org/responsivevoice.js?key=BiYgxJ4l",
        },
      ],
    },
  },
  yandexMaps: {
    apikey: process.env.YANDEX_API_KEY, // TODO: Add yandex map api key
  },
});
