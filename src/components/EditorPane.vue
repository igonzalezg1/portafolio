<script setup lang="ts">
interface Props {
  content: string[]
  filename: string
  image?: string | null
}

defineProps<Props>()

function lineClass(line: string): string {
  if (line.startsWith('# ')) return 'ln-h1'
  if (line.startsWith('## ')) return 'ln-h2'
  if (line.startsWith('→ ') || line.startsWith('→  ')) return 'ln-arrow'
  if (line.startsWith('· ')) return 'ln-bullet'
  if (line.startsWith('   ') && line.trim() !== '') return 'ln-indent'
  if (line === '') return 'ln-blank'
  return 'ln-text'
}

function renderLine(line: string): string {
  if (line.startsWith('# ')) {
    return `<span class="h1-hash"># </span><span class="h1-name">${escape(line.slice(2))}</span>`
  }
  if (line.startsWith('## ')) {
    return `<span class="h2-hash">## </span><span class="h2-name">${escape(line.slice(3))}</span>`
  }
  if (line.startsWith('→ ') || line.startsWith('→  ')) {
    const rest = line.replace(/^→\s+/, '')
    const spaceIdx = rest.search(/\s{2,}/)
    if (spaceIdx !== -1) {
      const id = escape(rest.slice(0, spaceIdx))
      const desc = escape(rest.slice(spaceIdx))
      return `<span class="arrow-sym">→</span>  <span class="arrow-id">${id}</span><span class="arrow-desc">${desc}</span>`
    }
    return `<span class="arrow-sym">→</span>  <span class="arrow-id">${escape(rest)}</span>`
  }
  if (line.startsWith('· ')) {
    return `<span class="bullet-dot">·</span> <span class="bullet-text">${escape(line.slice(2))}</span>`
  }
  if (line.startsWith('   ')) {
    return `<span class="indent-text">${escape(line)}</span>`
  }
  return escape(line)
}

function escape(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

<template>
  <div class="editor-pane">
    <!-- Project screenshot if available -->
    <div v-if="image" class="editor-img-wrap">
      <img :src="image" :alt="filename" class="editor-img" />
    </div>

    <!-- Lines -->
    <div class="editor-lines">
      <div v-for="(line, i) in content" :key="i" class="editor-line">
        <span class="ln-num">{{ i + 1 }}</span>
        <span :class="['ln-content', lineClass(line)]" v-html="renderLine(line)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-pane {
  flex: 1;
  overflow-y: auto;
  background: var(--bg, #f5f2ec);
  display: flex;
  flex-direction: column;
}

.editor-img-wrap {
  padding: 16px 16px 0 60px;
  border-bottom: 1px solid var(--border, #cfc9c0);
  max-height: 320px;
  overflow: hidden;
}

.editor-img {
  max-width: 720px;
  width: 100%;
  height: 220px;
  object-fit: cover;
  object-position: top;
  display: block;
  border: 1px solid var(--border, #cfc9c0);
}

.editor-lines {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}

.editor-line {
  display: flex;
  align-items: baseline;
  min-height: 20px;
  line-height: 20px;
}

.editor-line:hover {
  background: rgba(0, 0, 0, 0.02);
}

.ln-num {
  min-width: 48px;
  text-align: right;
  padding-right: 20px;
  color: var(--text-muted, #7a7060);
  font-size: 12px;
  user-select: none;
  flex-shrink: 0;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.ln-content {
  flex: 1;
  padding-right: 24px;
  font-family: 'Menlo', 'Monaco', 'Cascadia Code', 'Courier New', monospace;
  font-size: 13px;
  color: var(--text, #2a2420);
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Heading 1 */
.ln-h1 :deep(.h1-hash) { color: var(--text-muted, #7a7060); }
.ln-h1 :deep(.h1-name) {
  color: var(--accent, #9b2335);
  font-weight: 700;
  font-size: 14px;
}

/* Heading 2 */
.ln-h2 :deep(.h2-hash) { color: var(--text-muted, #7a7060); }
.ln-h2 :deep(.h2-name) {
  color: var(--accent, #9b2335);
  font-weight: 600;
}

/* Arrow lines */
.ln-arrow :deep(.arrow-sym) {
  color: var(--accent-b, #1c4f7a);
  font-weight: 700;
}
.ln-arrow :deep(.arrow-id) {
  color: var(--accent-b, #1c4f7a);
  font-weight: 600;
}
.ln-arrow :deep(.arrow-desc) {
  color: var(--text-muted, #7a7060);
}

/* Bullets */
.ln-bullet :deep(.bullet-dot) {
  color: var(--accent, #9b2335);
  font-weight: 700;
}
.ln-bullet :deep(.bullet-text) {
  color: var(--text, #2a2420);
}

/* Indented continuation */
.ln-indent :deep(.indent-text) {
  color: var(--text-muted, #7a7060);
}

/* Blank line */
.ln-blank {
  min-height: 10px;
}
</style>
