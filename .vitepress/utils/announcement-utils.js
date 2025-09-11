/**
 * お知らせ関連のユーティリティ関数
 */
import { ANNOUNCEMENT_CONFIG } from '../constants/index.js'

// HTMLタグを除去するヘルパー関数
export function stripHtml(html) {
  if (!html) return ''
  if (typeof html !== 'string') return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

// 日付フォーマット関数
export function formatDate(date, time) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日${time ? ` ${time}` : ''}`
}

// お知らせタイプのアイコン取得
export function getAnnouncementIcon(type) {
  return ANNOUNCEMENT_CONFIG.ICONS[type] || ANNOUNCEMENT_CONFIG.ICONS.default
}

// お知らせタイプのCSSクラス取得
export function getAnnouncementTypeClass(type) {
  return `announcement-${type}`
}

// テキスト切り詰め設定（定数から参照）
export const TRUNCATE_SETTINGS = ANNOUNCEMENT_CONFIG.TRUNCATE_LENGTH

// テキスト切り詰め判定
export function shouldTruncate(content, maxLength = TRUNCATE_SETTINGS.HOMEPAGE) {
  if (!content) return false
  const textContent = stripHtml(content)
  return textContent.length > maxLength
}

// テキスト切り詰め実行
export function getTruncatedContent(content, maxLength = TRUNCATE_SETTINGS.HOMEPAGE) {
  if (!content) return ''
  const textContent = stripHtml(content)
  if (textContent.length <= maxLength) return textContent
  return textContent.substring(0, maxLength) + '...'
}
