<template>
  <div class="announcement-navigation">
    <a href="/announcements" class="back-to-list">← お知らせ一覧に戻る</a>
  </div>
</template>

<style scoped>
.announcement-navigation {
  margin: 1rem 0 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.back-to-list {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-brand-1) !important;
  text-decoration: none !important;
  font-weight: 500;
  font-size: 0.9em;
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.back-to-list:hover {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white) !important;
  text-decoration: none !important;
}

.back-to-list::before {
  margin-right: 0.25rem;
}
</style>
