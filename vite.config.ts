import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { existsSync, promises as fs, readdirSync } from 'node:fs'
import path from 'node:path'

import { generateBlogPages, getBlogPosts } from './scripts/generate-blog-pages.ts'

function getBlogInputs() {
  const blogRoot = path.resolve(__dirname, './blog')
  const entries: Record<string, string> = {}

  if (!existsSync(blogRoot)) return entries

  const indexEntry = path.join(blogRoot, 'index.html')
  if (existsSync(indexEntry)) entries.blog = indexEntry

  for (const entry of readdirSync(blogRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const postEntry = path.join(blogRoot, entry.name, 'index.html')
    if (existsSync(postEntry)) entries[`blog-${entry.name}`] = postEntry
  }

  return entries
}

function blogContentWatcher(): Plugin {
  const postsRoot = path.resolve(__dirname, './src/content/blog')
  const assetsRoot = path.resolve(__dirname, './public/blog')
  let regeneration = Promise.resolve()

  return {
    name: 'blog-content-watcher',
    configureServer(server) {
      server.watcher.add([postsRoot, assetsRoot])

      const scheduleRegeneration = (file: string) => {
        const isPost = file.startsWith(postsRoot) && file.endsWith('.md')
        const isPostAsset = file.startsWith(assetsRoot)
        if (!isPost && !isPostAsset) return

        regeneration = regeneration
          .then(async () => {
            await generateBlogPages({ includeDrafts: true })
            server.ws.send({ type: 'full-reload' })
          })
          .catch((error: unknown) => {
            const message = error instanceof Error ? error.message : String(error)
            server.config.logger.error(`[blog] ${message}`)
          })
      }

      server.watcher.on('add', scheduleRegeneration)
      server.watcher.on('change', scheduleRegeneration)
      server.watcher.on('unlink', scheduleRegeneration)
    },
  }
}

function excludeDraftAssets(): Plugin {
  return {
    name: 'exclude-draft-blog-assets',
    apply: 'build',
    async closeBundle() {
      const draftPosts = (await getBlogPosts()).filter((post) => post.draft)
      for (const post of draftPosts) {
        const blogOutput = path.resolve(__dirname, './dist/blog')
        const draftOutput = path.resolve(blogOutput, post.slug)
        if (!draftOutput.startsWith(`${blogOutput}${path.sep}`)) {
          throw new Error(`Refusing to remove draft assets outside ${blogOutput}`)
        }
        await fs.rm(draftOutput, { recursive: true, force: true })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), ...(!isSsrBuild ? [blogContentWatcher(), excludeDraftAssets()] : [])],
  build: isSsrBuild ? { copyPublicDir: false } : {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html'),
        projects: path.resolve(__dirname, './projects/index.html'),
        ...getBlogInputs(),
      },
      output: {
        manualChunks: {
          'blog-markdown': ['react-markdown', 'remark-gfm'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
