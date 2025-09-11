<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AnnouncementNavigation from '../components/AnnouncementNavigation.vue'

const { page, frontmatter } = useData()
const { Layout } = DefaultTheme

// お知らせページかどうかを判定
const isAnnouncementPage = () => {
  return frontmatter.value?.layout === 'announcement' || 
         page.value.relativePath.startsWith('announcements/') && 
         !page.value.relativePath.endsWith('index.md')
}
</script>

<template>
  <Layout>
    <template v-if="isAnnouncementPage()" #doc-before>
      <AnnouncementNavigation />
    </template>
    <template v-if="isAnnouncementPage()" #doc-after>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid var(--vp-c-divider);">
      <AnnouncementNavigation />
    </template>
  </Layout>
</template>
