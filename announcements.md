---
title: お知らせ一覧
description: 松ケ丘小学校おやじの会の最新のお知らせ一覧です
---

# お知らせ一覧

<script setup>
import { data as announcements } from './announcements.data.js'
import { computed } from 'vue'
import { 
  stripHtml, 
  stripHtmlButKeepMarkdown,
  renderSimpleMarkdown,
  formatDate, 
  getAnnouncementIcon, 
  getAnnouncementTypeClass,
  shouldTruncate,
  getTruncatedContent,
  TRUNCATE_SETTINGS
} from './.vitepress/utils/announcement-utils.js'

// 表示可能なお知らせのみを取得
const visibleAnnouncements = computed(() => {
  return announcements.filter(item => item.isVisible)
})

function shouldTruncateContent(content) {
  return shouldTruncate(content, TRUNCATE_SETTINGS.LISTING)
}

function getTruncatedContentForListing(content) {
  return getTruncatedContent(content, TRUNCATE_SETTINGS.LISTING)
}

// Markdown装飾を保持した内容表示用
function getFormattedContent(content) {
  return renderSimpleMarkdown(stripHtmlButKeepMarkdown(content))
}
</script>

<div class="announcements-list">
  <div v-for="announcement in visibleAnnouncements" :key="announcement.url" class="announcement-item" :class="getAnnouncementTypeClass(announcement.frontmatter.type)">
    <div class="announcement-header">
      <span class="announcement-icon">{{ getAnnouncementIcon(announcement.frontmatter.type) }}</span>
      <h2 class="announcement-title">
        <a :href="announcement.url">{{ announcement.frontmatter.title }}</a>
      </h2>
      <span class="announcement-date">
        {{ formatDate(announcement.frontmatter.date, announcement.frontmatter.time) }}更新
      </span>
    </div>
    <div class="announcement-content">
      <div v-if="shouldTruncateContent(announcement.excerpt)" class="content-preview">
        <p v-html="getTruncatedContentForListing(announcement.excerpt)"></p>
        <div class="read-more-link">
          <a :href="announcement.url" class="continue-reading">続きを読む →</a>
        </div>
      </div>
      <div v-else class="content-full">
        <p v-html="getFormattedContent(announcement.excerpt)"></p>
      </div>
      <div class="announcement-footer">
        <a :href="announcement.url" class="detail-link">詳細を見る →</a>
      </div>
    </div>
  </div>
</div>
