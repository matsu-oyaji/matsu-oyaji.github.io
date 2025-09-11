import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { APP_CONFIG, URLS } from './constants/index.js'

export default withMermaid(defineConfig({
  title: APP_CONFIG.SITE_NAME,
  description: `${APP_CONFIG.MOTTO}を合言葉に、児童、地域にかかわりながら、和気あいあい、楽しく活動している会です。`,
  
  // GitHub Pages用の設定（組織のルートドメイン用）
  base: '/',
  
  // クリーンURLを有効化（.html拡張子を除去）
  cleanUrls: true,
  
  // ダークモードを無効化
  appearance: false,

  // 本番ビルドから除外するファイル（開発時のみ表示）
  srcExclude: [
    'README.md',
    'OPERATION.md',
    'docs/manual/**/*.md'
  ],
  
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon/icon-192x192.png' }],
    ['link', { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon/apple-touch-icon-180x180.png' }],
    ['meta', { property: 'og:url', content: URLS.WEBSITE_BASE }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: APP_CONFIG.SITE_NAME }],
    ['meta', { property: 'og:description', content: `${APP_CONFIG.SITE_NAME}のホームページ。` }],
    ['meta', { property: 'og:image', content: '/og.png' }],
    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-N2DQM5FHTV' }],
    ['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-N2DQM5FHTV');"]
  ],

  lang: 'ja',

  themeConfig: {
    logo: "/img/icon-160x160.png",
    
    nav: [
      { text: "🏠 ホーム", link: "/" },
      { text: "📢 お知らせ", link: "/announcements" },
      { text: "📰 おやじの会通信", link: "/letters" },
      { text: "📋 会則・議事録", link: "/minutes" },
      { text: "📞 お問い合わせ", link: "/inquiry" }
    ],

    lastUpdated: {
      text: 'Last Updated'
    },

    footer: {
      message: `(c) ${APP_CONFIG.ORGANIZATION}`,
      copyright: ''
    }
  }
}))
