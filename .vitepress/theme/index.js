import DefaultTheme from 'vitepress/theme'
import LatestAnnouncement from '../components/LatestAnnouncement.vue'
import AnnouncementNavigation from '../components/AnnouncementNavigation.vue'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('LatestAnnouncement', LatestAnnouncement)
    app.component('AnnouncementNavigation', AnnouncementNavigation)
  }
}
