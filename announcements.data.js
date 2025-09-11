import { createContentLoader } from 'vitepress'

export default createContentLoader('announcements/*.md', {
  excerpt: true,
  includeSrc: true,
  transform(rawData) {
    return rawData
      .filter(({ url }) => !url.includes('/README'))
      .map(({ url, frontmatter, excerpt, src }) => {
        // VitePressの excerpt オプションが生成したexcerptを使用
        let content = excerpt || ''
        
        // excerptが空の場合は手動で抽出
        if (!content && src) {
          const lines = src.split('\n')
          let inFrontmatter = false
          let pastFrontmatter = false
          let contentLines = []
          
          for (const line of lines) {
            if (line.trim() === '---') {
              if (!inFrontmatter) {
                inFrontmatter = true
              } else {
                inFrontmatter = false
                pastFrontmatter = true
              }
              continue
            }
            
            if (inFrontmatter) continue
            
            if (pastFrontmatter) {
              if (line.includes('<!-- more -->')) break
              if (line.trim().startsWith('#')) continue
              if (line.trim() !== '') {
                contentLines.push(line.trim())
              }
            }
          }
          
          content = contentLines.join(' ')
        }
        
        return {
          url,
          frontmatter,
          excerpt: content || 'お知らせの内容をご確認ください。',
          isVisible: frontmatter.visible !== false
        }
      })
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.date)
        const dateB = new Date(b.frontmatter.date)
        if (dateA.getTime() !== dateB.getTime()) {
          return dateB - dateA
        }
        return (a.frontmatter.priority || 999) - (b.frontmatter.priority || 999)
      })
  }
})
