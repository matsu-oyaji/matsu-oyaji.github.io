---
title: お知らせ一覧
description: 松ケ丘小学校おやじの会からのお知らせ一覧です
---

# お知らせ一覧

<script setup>
import { data as announcements } from './announcements.data.js'
import { computed } from 'vue'

// 表示可能なお知らせのみを取得
const visibleAnnouncements = computed(() => {
  return announcements.filter(item => item.isVisible)
})

function getAnnouncementTypeIcon(type) {
  const icons = {
    warning: '🚨',
    info: '📢',
    tip: '🎉',
    danger: '⚠️'
  }
  return icons[type] || '📄'
}

function getAnnouncementTypeClass(type) {
  return `announcement-${type}`
}

function formatDate(date, time) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日${time ? ` ${time}` : ''}`
}

function shouldTruncateContent(content) {
  const TRUNCATE_LENGTH = 150 // 一覧ページでは少し短く
  const textContent = stripHtml(content)
  return textContent.length > TRUNCATE_LENGTH
}

function getTruncatedContent(content) {
  const TRUNCATE_LENGTH = 150
  const textContent = stripHtml(content)
  if (textContent.length <= TRUNCATE_LENGTH) return textContent
  return textContent.substring(0, TRUNCATE_LENGTH) + '...'
}

// HTMLタグを除去するヘルパー関数
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').trim()
}
</script>

<div class="announcements-list">
  <div v-for="announcement in visibleAnnouncements" :key="announcement.url" class="announcement-item" :class="getAnnouncementTypeClass(announcement.frontmatter.type)">
    <div class="announcement-header">
      <span class="announcement-icon">{{ getAnnouncementTypeIcon(announcement.frontmatter.type) }}</span>
      <span class="announcement-title">
        <a :href="announcement.url">{{ announcement.frontmatter.title }}</a>
      </span>
      <span class="announcement-date">
        {{ formatDate(announcement.frontmatter.date, announcement.frontmatter.time) }}更新
      </span>
    </div>
    <div class="announcement-content">
      <div v-if="shouldTruncateContent(announcement.excerpt)" class="content-preview">
        <p>{{ getTruncatedContent(announcement.excerpt) }}</p>
        <div class="read-more-link">
          <a :href="announcement.url" class="continue-reading">続きを読む →</a>
        </div>
      </div>
      <div v-else class="content-full">
        <p>{{ stripHtml(announcement.excerpt) }}</p>
      </div>
      <div class="announcement-footer">
        <a :href="announcement.url" class="detail-link">詳細を見る →</a>
      </div>
    </div>
  </div>
</div>
