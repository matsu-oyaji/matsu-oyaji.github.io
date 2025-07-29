import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "松ケ丘小学校おやじの会",
  description: "「できる時に、できる事を、できる人が」を合言葉に、児童、地域にかかわりながら、和気あいあい、楽しく活動している会です。",
  
  // GitHub Pages用の設定（組織のルートドメイン用）
  base: '/',
  
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon/icon-192x192.png' }],
    ['link', { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon/apple-touch-icon-180x180.png' }],
    ['meta', { property: 'og:url', content: 'http://matsu-oyaji.net/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '松ケ丘小学校おやじの会' }],
    ['meta', { property: 'og:description', content: '松ケ丘小学校おやじの会のホームページ。' }],
    ['meta', { property: 'og:image', content: '/og.png' }],
    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-N2DQM5FHTV' }],
    ['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-N2DQM5FHTV');"]
  ],

  lang: 'ja',

  themeConfig: {
    logo: "/img/icon-160x160.png",
    
    nav: [
      { text: "ホーム", link: "/" },
      // { text: "活動内容", link: "/about/activities.html" },
      // { text: "校長先生より", link: "/about/principal.html" },
      { text: "おやじの会通信", link: "/letters.html" },
      { text: "会則", link: "/minutes.html" },
      // { text: "リンク", link: "/links.html" },
      { text: "お問い合わせ", link: "/inquiry.html" }
    ],

    lastUpdated: {
      text: 'Last Updated'
    },

    footer: {
      message: '(c) 松ケ丘小学校おやじの会',
      copyright: ''
    }
  }
})