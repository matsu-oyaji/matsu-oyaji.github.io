<template>
  <div v-if="latestAnnouncement" class="latest-announcement">
    <div :class="getContainerClass(latestAnnouncement.frontmatter.type)">
      <div class="announcement-header">
        <span class="announcement-icon">{{ getIcon(latestAnnouncement.frontmatter.type) }}</span>
        <strong>{{ latestAnnouncement.frontmatter.title }}</strong>
        <span class="announcement-date">
          （{{ formatDate(latestAnnouncement.frontmatter.date, latestAnnouncement.frontmatter.time) }}更新）
        </span>
      </div>
      <div class="announcement-content">
        <div v-if="shouldTruncate" class="content-preview">
          <p>{{ truncatedContent }}</p>
          <div class="read-more-inline">
            <a :href="latestAnnouncement.url" class="continue-reading">...続きを読む →</a>
          </div>
        </div>
        <div v-else class="content-full">
          <p>{{ stripHtml(latestAnnouncement.excerpt) }}</p>
        </div>
      </div>
      <div class="announcement-footer">
        <a :href="latestAnnouncement.url" class="read-more">詳細を見る →</a>
        <a href="/announcements" class="all-announcements">すべてのお知らせを見る</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { data as announcements } from '../../announcements.data.js'

// 表示可能な最初のお知らせを取得
const latestAnnouncement = computed(() => {
  const visibleAnnouncements = announcements.filter(item => item.isVisible)
  return visibleAnnouncements[0] || null
})

// 本文の切り詰め設定
const TRUNCATE_LENGTH = 200 // 文字数制限
const shouldTruncate = computed(() => {
  if (!latestAnnouncement.value?.excerpt) return false
  const textContent = stripHtml(latestAnnouncement.value.excerpt)
  return textContent.length > TRUNCATE_LENGTH
})

const truncatedContent = computed(() => {
  if (!latestAnnouncement.value?.excerpt || !shouldTruncate.value) return ''
  const textContent = stripHtml(latestAnnouncement.value.excerpt)
  const truncated = textContent.substring(0, TRUNCATE_LENGTH)
  return truncated + '...'
})

// HTMLタグを除去するヘルパー関数
function stripHtml(html) {
  if (!html) return ''
  if (typeof html !== 'string') return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

function getIcon(type) {
  const icons = {
    warning: '🚨',
    info: '📢',
    tip: '🎉',
    danger: '⚠️'
  }
  return icons[type] || '📄'
}

function getContainerClass(type) {
  return `custom-block ${type}`
}

function formatDate(date, time) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日${time ? ` ${time}` : ''}`
}
</script>

<style scoped>
.latest-announcement {
  margin: 2rem 0;
}

.custom-block {
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
  border-left: 4px solid;
}

.custom-block.warning {
  border-left-color: #f56565;
  background: var(--vp-custom-block-warning-bg, #fef5e7);
  color: var(--vp-custom-block-warning-text, #8b5a2b);
}

.custom-block.info {
  border-left-color: #4299e1;
  background: var(--vp-custom-block-info-bg, #f0f9fe);
  color: var(--vp-custom-block-info-text, #0f4880);
}

.custom-block.tip {
  border-left-color: #38a169;
  background: var(--vp-custom-block-tip-bg, #f0fff4);
  color: var(--vp-custom-block-tip-text, #22543d);
}

.custom-block.danger {
  border-left-color: #e53e3e;
  background: var(--vp-custom-block-danger-bg, #fef5f5);
  color: var(--vp-custom-block-danger-text, #822727);
}

.announcement-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.announcement-icon {
  font-size: 1.1em;
}

.announcement-date {
  font-size: 0.9em;
  font-weight: normal;
}

.announcement-content {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.content-preview {
  margin-bottom: 0.5rem;
}

.read-more-inline {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 0.9em;
  flex-wrap: wrap;
}

.read-more,
.all-announcements {
  text-decoration: none;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.read-more:hover,
.all-announcements:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .announcement-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .announcement-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
