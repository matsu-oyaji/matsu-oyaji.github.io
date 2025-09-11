/**
 * お知らせ関連のユーティリティ関数
 */
import { ANNOUNCEMENT_CONFIG } from '../constants/index.js'

// HTMLタグを除去するヘルパー関数（後方互換性のため保持）
export function stripHtml(html) {
  if (!html) return ''
  if (typeof html !== 'string') return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

// Markdownの基本的な装飾を保持しつつ、HTMLタグのみ除去
export function stripHtmlButKeepMarkdown(content) {
  if (!content) return ''
  if (typeof content !== 'string') return ''
  
  // HTMLタグを除去しつつ、Markdownの基本構文は保持
  return content
    .replace(/<[^>]*>/g, '') // HTMLタグを除去
    .trim()
}

// 簡易Markdownレンダリング（太字、斜体、リンクのみ対応）
export function renderSimpleMarkdown(text) {
  if (!text) return ''
  if (typeof text !== 'string') return text
  
  return text
    // 太字 **text** → <strong>text</strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 斜体 *text* → <em>text</em>  
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // リンク [text](url) → <a href="url">text</a>
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
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

// テキスト切り詰め判定（Markdown装飾を考慮）
export function shouldTruncate(content, maxLength = TRUNCATE_SETTINGS.HOMEPAGE) {
  if (!content) return false
  const textContent = stripHtml(content)
  return textContent.length > maxLength
}

// テキスト切り詰め実行（Markdown装飾を保持）
export function getTruncatedContent(content, maxLength = TRUNCATE_SETTINGS.HOMEPAGE) {
  if (!content) return ''
  
  // まずプレーンテキストの長さを確認
  const plainText = stripHtml(content)
  if (plainText.length <= maxLength) {
    return renderSimpleMarkdown(stripHtmlButKeepMarkdown(content))
  }
  
  // 切り詰めが必要な場合
  const truncatedPlain = plainText.substring(0, maxLength)
  
  // 元のコンテンツからMarkdown装飾を保持しつつ切り詰める
  let truncatedWithMarkdown = stripHtmlButKeepMarkdown(content)
  
  // 簡易的な切り詰め（正確ではないが、基本的なケースには対応）
  if (stripHtml(truncatedWithMarkdown).length > maxLength) {
    // より精密な切り詰めロジックが必要な場合はここで実装
    const words = truncatedWithMarkdown.split(' ')
    let result = ''
    let currentLength = 0
    
    for (const word of words) {
      const wordPlainLength = stripHtml(word).length
      if (currentLength + wordPlainLength > maxLength) break
      result += (result ? ' ' : '') + word
      currentLength += wordPlainLength
    }
    
    truncatedWithMarkdown = result
  }
  
  return renderSimpleMarkdown(truncatedWithMarkdown) + '...'
}
