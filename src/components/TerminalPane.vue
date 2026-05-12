<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

const props = defineProps<{
  fileContents: Record<string, string[]>
}>()

const emit = defineEmits<{
  openFile: [path: string]
}>()

// ─── State ────────────────────────────────────────────────────────────────────

interface HistoryEntry {
  cmd: string
  output: string[]
}

const history = ref<HistoryEntry[]>([])
const currentInput = ref('')      // shown during auto-play typing
const inputValue = ref('')        // real input box value
const autoPlaying = ref(true)
const outputEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const cmdHistory = ref<string[]>([])
const cmdHistoryIdx = ref(-1)
const currentDir = ref('portfolio')

// ─── Command execution ────────────────────────────────────────────────────────

function executeCmd(rawCmd: string): string[] {
  const parts = rawCmd.trim().split(/\s+/)
  const cmd = parts[0]?.toLowerCase() ?? ''
  const args = parts.slice(1)

  switch (cmd) {
    case 'whoami':
      return [
        'Iván González García  ·  full-stack engineer',
        'Ciudad de México  ·  4+ yrs  ·  open to roles',
      ]

    case 'pwd':
      return [`/home/igonzalez/${currentDir.value}`]

    case 'clear':
      history.value = []
      return []

    case 'help':
      return [
        'available commands',
        '',
        '  whoami              show identity',
        '  ls [dir/]           list directory contents',
        '  cat <file>          print file content',
        '  open <file>         open file in editor',
        '  stack               show tech stack',
        '  contact [--all]     show contact info',
        '  git log --oneline   show commit history',
        '  pwd                 print working directory',
        '  clear               clear terminal',
        '  help                show this message',
      ]

    case 'ls': {
      const target = args[0]?.replace('--featured', '').trim().replace(/\/$/, '') ?? currentDir.value
      return lsDir(target, args.includes('--featured'))
    }

    case 'cd': {
      const target = args[0]?.replace(/\/$/, '') ?? 'portfolio'
      if (target === '..' || target === '') {
        currentDir.value = 'portfolio'
        return []
      }
      const known = ['experience', 'projects', 'portfolio']
      if (known.includes(target)) {
        currentDir.value = target
        return []
      }
      return [`cd: ${target}: No such file or directory`]
    }

    case 'cat': {
      const file = args[0] ?? ''
      const resolved = resolveFile(file)
      if (!resolved) return [`cat: ${file}: No such file or directory`]
      emit('openFile', resolved)
      const lines = props.fileContents[resolved]
      if (!lines) return [`cat: ${file}: No such file or directory`]
      return lines.slice(0, 20).concat(lines.length > 20 ? ['...'] : [])
    }

    case 'open': {
      const file = args[0] ?? ''
      const resolved = resolveFile(file)
      if (!resolved) return [`open: ${file}: No such file or directory`]
      emit('openFile', resolved)
      return [`opening ${resolved} in editor...`]
    }

    case 'stack': {
      const grepRaw = args.includes('--grep') ? (args[args.indexOf('--grep') + 1] ?? null) : null
      if (grepRaw) {
        const grep = grepRaw
        const all = stackLines().join(' ')
        return [all.split('·').filter(t => t.toLowerCase().includes(grep.toLowerCase())).map(t => `· ${t.trim()}`).join('  ') || `no results for '${grep}'`]
      }
      return stackLines()
    }

    case 'contact': {
      return [
        'mail      — gonzalezgarciaivandejesus@gmail.com',
        'phone     — +52 729-109-7554',
        'linkedin  — /in/gonzalezgivan2000',
      ]
    }

    case 'git': {
      if (args[0] === 'log' && args[1] === '--oneline') {
        return [
          'd5866f0  feat: portfolio terminal redesign',
          '0171c31  feat: visa electronica — SRE system',
          'bd954c3  feat: sipf microservices — B-process',
          '7cef59f  feat: seller center — doto.com.mx',
          'fed2fab  feat: sumapp dashboards',
          'a1b2c3d  init: project setup',
        ]
      }
      return [`git: unknown command '${args.join(' ')}'`]
    }

    case '':
      return []

    default:
      return [`${cmd}: command not found  (try 'help')`]
  }
}

function resolveFile(input: string): string | null {
  // If it contains a slash, it's already a path
  if (input.includes('/')) {
    if (props.fileContents[input]) return input
    return null
  }
  // Try to find in current directory context
  if (currentDir.value !== 'portfolio') {
    const withDir = `${currentDir.value}/${input}`
    if (props.fileContents[withDir]) return withDir
  }
  // Try root
  if (props.fileContents[input]) return input
  // Try adding .md
  const withMd = input.endsWith('.md') ? input : `${input}.md`
  if (props.fileContents[withMd]) return withMd
  if (currentDir.value !== 'portfolio') {
    const withDirMd = `${currentDir.value}/${withMd}`
    if (props.fileContents[withDirMd]) return withDirMd
  }
  return null
}

function lsDir(dir: string, featured = false): string[] {
  if (dir === 'portfolio' || dir === '' || dir === '.') {
    return [
      'README.md            —',
      'experience/          4 entries',
      'projects/            4 entries',
      'skills.md            —',
      'certifications.md    —',
      'contact.md           —',
    ]
  }
  if (dir === 'experience') {
    return [
      'b-process.md         2025    →',
      'infotec.md           2023    →',
      'doto.md              2022    →',
      'empresa-virtual.md   2021    →',
    ]
  }
  if (dir === 'projects') {
    const rows = [
      'visa-electronica.md  2023    →',
      'sipf.md              2025    →',
      'seller-center.md     2022    →',
      'sumapp.md            2021    →',
    ]
    return featured ? rows.slice(0, 3) : rows
  }
  return [`ls: ${dir}: No such directory`]
}

function stackLines(): string[] {
  return [
    'backend   · Laravel · Spring Boot · Docker · Kubernetes · Golang',
    'frontend  · VueJS · Angular · React · TailwindCSS',
    'databases · PostgreSQL · MySQL · Oracle',
    'devops    · Docker · Kubernetes · Git · CI/CD · Linux',
    'extras    · Vtex · Shopify · Hexagonal Arch · SCRUM',
  ]
}

// ─── Input handling ───────────────────────────────────────────────────────────

function submitCommand() {
  const raw = inputValue.value.trim()
  if (!raw) return
  cmdHistory.value.unshift(raw)
  cmdHistoryIdx.value = -1
  const output = executeCmd(raw)
  if (raw !== 'clear') {
    history.value.push({ cmd: raw, output })
  }
  inputValue.value = ''
  scrollBottom()
}

function historyUp() {
  if (cmdHistoryIdx.value < cmdHistory.value.length - 1) {
    cmdHistoryIdx.value++
    inputValue.value = cmdHistory.value[cmdHistoryIdx.value] ?? ''
  }
}

function historyDown() {
  if (cmdHistoryIdx.value > 0) {
    cmdHistoryIdx.value--
    inputValue.value = cmdHistory.value[cmdHistoryIdx.value] ?? ''
  } else {
    cmdHistoryIdx.value = -1
    inputValue.value = ''
  }
}

function scrollBottom() {
  nextTick(() => {
    if (outputEl.value) {
      outputEl.value.scrollTop = outputEl.value.scrollHeight
    }
  })
}

// ─── Auto-play sequence ───────────────────────────────────────────────────────

const AUTO_SEQ = [
  { cmd: 'whoami', delay: 900 },
  { cmd: 'ls projects/ --featured', delay: 600 },
  { cmd: 'stack --grep core', delay: 500 },
  { cmd: 'contact --all', delay: 400 },
]

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

async function typeCommand(cmd: string): Promise<void> {
  currentInput.value = ''
  for (const ch of cmd) {
    currentInput.value += ch
    await sleep(55)
  }
}

async function runAutoPlay() {
  await sleep(600)
  for (const step of AUTO_SEQ) {
    await typeCommand(step.cmd)
    await sleep(180)
    const output = executeCmd(step.cmd)
    history.value.push({ cmd: step.cmd, output })
    currentInput.value = ''
    scrollBottom()
    await sleep(step.delay)
  }
  autoPlaying.value = false
  currentInput.value = ''
  await nextTick()
  inputEl.value?.focus()
}

onMounted(() => {
  runAutoPlay()
})

// ─── Terminal line renderer ───────────────────────────────────────────────────

function renderOutputLine(line: string): string {
  if (line === '') return '&nbsp;'
  // "section  ·  ..." style
  if (line.includes('  ·  ') || line.includes('  —  ')) {
    const [left = '', ...rest] = line.split(/\s{2,}[·—]\s{2,}/)
    const right = rest.join('  ·  ')
    return `<span class="to-key">${escT(left)}</span><span class="to-sep">  ·  </span><span class="to-val">${escT(right)}</span>`
  }
  // "key  —  value" contact lines
  if (/^\w+\s+—\s/.test(line)) {
    const m = line.match(/^(\S+)\s+(—)\s+(.+)$/)
    if (m) {
      return `<span class="to-key">${escT(m[1] ?? '')}</span>  <span class="to-sep">—</span>  <span class="to-val">${escT(m[3] ?? '')}</span>`
    }
  }
  // "key  · item · item" stack lines
  if (/^\w+\s+·/.test(line)) {
    const idx = line.indexOf('  ')
    const key = line.slice(0, idx)
    const rest2 = line.slice(idx)
    return `<span class="to-category">${escT(key)}</span><span class="to-stack">${escT(rest2)}</span>`
  }
  // indented commands list (help)
  if (line.startsWith('  ')) {
    return `<span class="to-indent">${escT(line)}</span>`
  }
  // error
  if (line.includes('command not found') || line.includes('No such')) {
    return `<span class="to-error">${escT(line)}</span>`
  }
  // git log lines
  if (/^[a-f0-9]{7}\s/.test(line)) {
    const hash = line.slice(0, 7)
    const msg = line.slice(8)
    return `<span class="to-hash">${hash}</span>  <span class="to-text">${escT(msg)}</span>`
  }
  // ls rows with →
  if (line.includes('    →')) {
    const [name = '', ...rest2] = line.split(/\s{2,}/)
    return `<span class="to-fname">${escT(name)}</span>  <span class="to-muted">${escT(rest2.join('  '))}</span>`
  }
  return `<span class="to-text">${escT(line)}</span>`
}

function escT(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

<template>
  <div class="terminal-pane">
    <!-- Terminal header -->
    <div class="t-header">
      <span class="t-label">TERMINAL</span>
      <span class="t-path">~/portfolio  ·  {{ currentDir }}</span>
    </div>

    <!-- Output -->
    <div class="t-output" ref="outputEl">
      <div v-for="(entry, i) in history" :key="i" class="t-entry">
        <div class="t-cmd-row">
          <span class="t-prompt">›</span>
          <span class="t-cmd-text">{{ entry.cmd }}</span>
        </div>
        <div
          v-for="(line, j) in entry.output"
          :key="j"
          class="t-out-line"
          v-html="renderOutputLine(line)"
        />
      </div>

      <!-- Auto-play typing line -->
      <div v-if="autoPlaying" class="t-cmd-row">
        <span class="t-prompt">›</span>
        <span class="t-cmd-text">{{ currentInput }}</span>
        <span class="t-cursor">█</span>
      </div>
    </div>

    <!-- Input row (shown after auto-play) -->
    <div v-if="!autoPlaying" class="t-input-row">
      <span class="t-prompt">›</span>
      <input
        ref="inputEl"
        v-model="inputValue"
        class="t-input"
        placeholder="type a command..."
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        @keydown.enter="submitCommand"
        @keydown.up.prevent="historyUp"
        @keydown.down.prevent="historyDown"
      />
    </div>
  </div>
</template>

<style scoped>
.terminal-pane {
  --t-bg:     #f0ece3;
  --t-border: #cfc9c0;
  --t-text:   #2a2420;
  --t-muted:  #7a7060;
  --t-prompt: #9b2335;
  --t-blue:   #1c4f7a;
  --t-green:  #2d6e2d;
  --t-error:  #9b2335;
  --font-mono: 'Menlo', 'Monaco', 'Cascadia Code', 'Courier New', monospace;

  display: flex;
  flex-direction: column;
  height: 220px;
  min-height: 220px;
  background: var(--t-bg);
  border-top: 1px solid var(--t-border);
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--t-text);
}

.t-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 26px;
  min-height: 26px;
  padding: 0 12px;
  background: #e8e4db;
  border-bottom: 1px solid var(--t-border);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.t-label {
  font-weight: 700;
  color: var(--t-muted);
}

.t-path {
  color: var(--t-muted);
  opacity: 0.6;
}

.t-output {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.t-entry {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-bottom: 6px;
}

.t-cmd-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-height: 18px;
}

.t-prompt {
  color: var(--t-prompt);
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}

.t-cmd-text {
  color: var(--t-text);
  font-weight: 500;
}

.t-cursor {
  color: var(--t-text);
  animation: blink 1s step-end infinite;
  font-size: 11px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.t-out-line {
  padding-left: 18px;
  color: var(--t-text);
  min-height: 18px;
  line-height: 18px;
  white-space: pre;
}

/* Output token styles */
.t-out-line :deep(.to-key)      { color: var(--t-blue); font-weight: 600; }
.t-out-line :deep(.to-sep)      { color: var(--t-muted); }
.t-out-line :deep(.to-val)      { color: var(--t-text); }
.t-out-line :deep(.to-category) { color: var(--t-blue); font-weight: 600; min-width: 80px; display: inline-block; }
.t-out-line :deep(.to-stack)    { color: var(--t-text); }
.t-out-line :deep(.to-indent)   { color: var(--t-muted); }
.t-out-line :deep(.to-error)    { color: var(--t-error); }
.t-out-line :deep(.to-hash)     { color: var(--t-green); font-weight: 700; }
.t-out-line :deep(.to-text)     { color: var(--t-text); }
.t-out-line :deep(.to-fname)    { color: var(--t-blue); font-weight: 600; }
.t-out-line :deep(.to-muted)    { color: var(--t-muted); }

/* Input row */
.t-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  min-height: 32px;
  padding: 0 12px;
  border-top: 1px solid var(--t-border);
  background: var(--t-bg);
}

.t-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--t-text);
  font-family: var(--font-mono);
  font-size: 12.5px;
  caret-color: var(--t-prompt);
}

.t-input::placeholder {
  color: var(--t-muted);
  opacity: 0.5;
}
</style>
