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
      <h2 class="announcement-title">
        <a :href="announcement.url">{{ announcement.frontmatter.title }}</a>
      </h2>
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

<style scoped>
.announcements-list {
  max-width: 800px;
  margin: 0 auto;
}

.announcement-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

.announcement-warning {
  border-left: 4px solid #f56565;
  background: var(--vp-custom-block-warning-bg);
}

.announcement-info {
  border-left: 4px solid #4299e1;
  background: var(--vp-custom-block-info-bg);
}

.announcement-tip {
  border-left: 4px solid #38a169;
  background: var(--vp-custom-block-tip-bg);
}

.announcement-danger {
  border-left: 4px solid #e53e3e;
  background: var(--vp-custom-block-danger-bg);
}

.announcement-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.announcement-icon {
  font-size: 1.2em;
}

.announcement-title {
  margin: 0;
  flex: 1;
  min-width: 200px;
}

.announcement-title a {
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.announcement-title a:hover {
  color: var(--vp-c-brand-1);
}

.announcement-date {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.announcement-content {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin-top: 1rem;
}

.content-preview {
  margin-bottom: 0.5rem;
}

.read-more-link {
  margin-top: 0.5rem;
}

.continue-reading {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9em;
}

.continue-reading:hover {
  text-decoration: underline;
}

.announcement-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: flex-end;
}

.detail-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9em;
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.detail-link:hover {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.announcement-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .announcement-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .announcement-date {
    align-self: flex-end;
  }
}
</style>
