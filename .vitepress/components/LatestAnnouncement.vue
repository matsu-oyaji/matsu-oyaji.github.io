<template>
  <div v-if="latestAnnouncement" class="announcements-list">
    <div class="announcement-item" :class="getAnnouncementTypeClass(latestAnnouncement.frontmatter.type)">
      <div class="announcement-header">
        <span class="announcement-icon">{{ getAnnouncementIcon(latestAnnouncement.frontmatter.type) }}</span>
        <span class="announcement-title">{{ latestAnnouncement.frontmatter.title }}</span>
        <span class="announcement-date">
          （{{ formatDate(latestAnnouncement.frontmatter.date, latestAnnouncement.frontmatter.time) }}更新）
        </span>
      </div>
      <div class="announcement-content">
        <div v-if="shouldTruncateContent" class="content-preview">
          <p v-html="truncatedContent"></p>
          <div class="read-more-inline">
            <a :href="latestAnnouncement.url" class="continue-reading">...続きを読む →</a>
          </div>
        </div>
        <div v-else class="content-full">
          <p v-html="renderSimpleMarkdown(stripHtmlButKeepMarkdown(latestAnnouncement.excerpt))"></p>
        </div>
      </div>
      <div class="announcement-footer">
        <a :href="latestAnnouncement.url" class="read-more">詳細を見る →</a>
      </div>
    </div>
    <div class="all-announcements-link">
      <a href="/announcements" class="all-announcements">すべてのお知らせを見る</a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { data as announcements } from '../../announcements.data.js'
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
} from '../utils/announcement-utils.js'

// 表示可能な最初のお知らせを取得
const latestAnnouncement = computed(() => {
  const visibleAnnouncements = announcements.filter(item => item.isVisible)
  return visibleAnnouncements[0] || null
})

// 本文の切り詰め設定
const shouldTruncateContent = computed(() => {
  if (!latestAnnouncement.value?.excerpt) return false
  return shouldTruncate(latestAnnouncement.value.excerpt, TRUNCATE_SETTINGS.HOMEPAGE)
})

const truncatedContent = computed(() => {
  if (!latestAnnouncement.value?.excerpt || !shouldTruncateContent.value) return ''
  return getTruncatedContent(latestAnnouncement.value.excerpt, TRUNCATE_SETTINGS.HOMEPAGE)
})
</script>

<style scoped>
.announcements-list {
  margin: 2rem 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.announcement-item {
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  border-left: 4px solid;
}

.announcement-warning {
  border-left-color: #f56565;
  background: var(--vp-custom-block-warning-bg, #fef5e7);
  color: var(--vp-custom-block-warning-text, #8b5a2b);
}

.announcement-info {
  border-left-color: #4299e1;
  background: var(--vp-custom-block-info-bg, #f0f9fe);
  color: var(--vp-custom-block-info-text, #0f4880);
}

.announcement-tip {
  border-left-color: #38a169;
  background: var(--vp-custom-block-tip-bg, #f0fff4);
  color: var(--vp-custom-block-tip-text, #22543d);
}

.announcement-danger {
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
  font-size: 1.2em;
}

.announcement-title {
  margin: 0;
  flex: 1;
  min-width: 200px;
  font-size: 1.25rem;
  font-weight: normal;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base);
  line-height: 1.4;
}

.announcement-header strong {
  margin: 0;
  flex: 1;
  min-width: 200px;
  font-size: 1.25rem;
  font-weight: 600;
}

.announcement-date {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.announcement-content {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin-top: 1rem;
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
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9em;
}

.all-announcements-link {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.read-more,
.all-announcements {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover,
.all-announcements:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .announcements-list {
    max-width: 100%;
    margin: 1rem 0;
  }
  
  .announcement-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .announcement-footer {
    justify-content: flex-end;
  }
  
  .all-announcements-link {
    justify-content: flex-end;
  }
  
  .read-more,
  .all-announcements {
    width: auto;
    text-align: right;
    box-sizing: border-box;
  }
}
</style>
