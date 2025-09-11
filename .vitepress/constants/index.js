/**
 * プロジェクト全体で使用する定数定義
 */

// アプリケーション設定
export const APP_CONFIG = {
  SITE_NAME: '松ケ丘小学校おやじの会',
  ORGANIZATION: '松ケ丘小学校おやじの会',
  MOTTO: '「できる時に、できる事を、できる人が」',
  FOUNDED_YEAR: 2003,
  CURRENT_MEMBERS: 30
}

// URL設定
export const URLS = {
  INSTAGRAM: 'https://www.instagram.com/matsu.oyaji.moriya',
  WEBSITE_BASE: 'http://matsu-oyaji.net/'
}

// レスポンシブブレークポイント
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024
}

// ファイルパス設定
export const PATHS = {
  IMAGES: '/img/',
  DOCS: '/docs/',
  EVENTS: '/event/',
  FAVICON: '/favicon/'
}

// お知らせ設定（announcement-utils.jsから移動）
export const ANNOUNCEMENT_CONFIG = {
  TRUNCATE_LENGTH: {
    HOMEPAGE: 200,
    LISTING: 150
  },
  TYPES: {
    WARNING: 'warning',
    INFO: 'info', 
    TIP: 'tip',
    DANGER: 'danger'
  },
  ICONS: {
    warning: '🚨',
    info: '📢',
    tip: '🎉',
    danger: '⚠️',
    default: '📄'
  }
}
