<script setup lang="ts">
import { ref, computed } from 'vue'
import EditorPane from './components/EditorPane.vue'
import TerminalPane from './components/TerminalPane.vue'
import visaElectronica from '@/assets/img/visaelectronica.png'
import sellerCenter from '@/assets/img/sellercenter.png'
import sipf from '@/assets/img/sipf.png'
import sumapp from '@/assets/img/sumapp.png'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FileNode {
  name: string
  type: 'file' | 'dir'
  path: string
  children?: FileNode[]
}

// ─── File tree ────────────────────────────────────────────────────────────────

const fileTree: FileNode[] = [
  { name: 'README.md', type: 'file', path: 'README.md' },
  {
    name: 'experience/',
    type: 'dir',
    path: 'experience',
    children: [
      { name: 'b-process.md', type: 'file', path: 'experience/b-process.md' },
      { name: 'infotec.md', type: 'file', path: 'experience/infotec.md' },
      { name: 'doto.md', type: 'file', path: 'experience/doto.md' },
      { name: 'empresa-virtual.md', type: 'file', path: 'experience/empresa-virtual.md' },
    ],
  },
  {
    name: 'projects/',
    type: 'dir',
    path: 'projects',
    children: [
      { name: 'visa-electronica.md', type: 'file', path: 'projects/visa-electronica.md' },
      { name: 'sipf.md', type: 'file', path: 'projects/sipf.md' },
      { name: 'seller-center.md', type: 'file', path: 'projects/seller-center.md' },
      { name: 'sumapp.md', type: 'file', path: 'projects/sumapp.md' },
    ],
  },
  { name: 'skills.md', type: 'file', path: 'skills.md' },
  { name: 'certifications.md', type: 'file', path: 'certifications.md' },
  { name: 'contact.md', type: 'file', path: 'contact.md' },
]

// ─── File contents ────────────────────────────────────────────────────────────

const fileContents: Record<string, string[]> = {
  'README.md': [
    '# README.md',
    '',
    '## Iván González García',
    'full-stack engineer  ·  backend-leaning  ·  open to senior roles',
    '',
    '## location',
    'Ciudad de México, México',
    '',
    '## stats',
    '4+   years of experience',
    '10+  verifiable projects',
    '10+  technologies in active stack',
    '',
    '## featured projects',
    '→  Visa Electrónica    sistema de visado electrónico — SRE México',
    '→  SIPF                sistema penitenciario federal — B-process',
    '→  Seller Center       plataforma de gestión para vendedores — doto.com.mx',
    '→  Sumapp              aplicación de gestión empresarial',
    '',
    '## summary',
    'Construyo soluciones web escalables y de alto rendimiento.',
    'He liderado proyectos de alto impacto a nivel gubernamental',
    'e institucional — desde arquitecturas de microservicios',
    'hasta sistemas de visado electrónico de alcance internacional.',
    '',
    '## open to',
    '· proyectos freelance',
    '· posiciones full-time senior',
    '· consultoría de arquitectura',
  ],

  'experience/b-process.md': [
    '# b-process.md',
    '',
    '## B-process  ·  2025',
    'Desarrollador Mid Full-Stack',
    '',
    '## description',
    'Lideré el desarrollo de microservicios para el Sistema',
    'Penitenciario Federal, mejorando la eficiencia del',
    'sistema en un 20%. Implementación de microservicios',
    'de selectores en catálogos del MEF (Perú).',
    '',
    '## stack',
    '· Laravel  · Spring Boot  · Docker  · Kubernetes',
    '· Oracle DB  · MySQL  · SCRUM  · Angular',
    '· VueJS  · Git  · GitHub Actions',
  ],

  'experience/infotec.md': [
    '# infotec.md',
    '',
    '## INFOTEC  ·  2023',
    'Desarrollador Mid Full-Stack',
    '',
    '## description',
    'Diseño e implementación de soluciones para la Secretaría',
    'de Relaciones Exteriores. Desarrollo del sistema de Visa',
    'Electrónica — solución de alcance internacional.',
    '',
    '## stack',
    '· Laravel  · PostgreSQL  · SCRUM  · VueJS',
    '· TailwindCSS  · Git  · Quasar  · Figma  · UX/UI',
  ],

  'experience/doto.md': [
    '# doto.md',
    '',
    '## doto.com.mx  ·  2022',
    'Desarrollador Jr.',
    '',
    '## description',
    'Middleware entre sellers y usuarios finales.',
    'Generación de guías de paquetería y crossdocking.',
    'Mantenimiento de plataformas de devoluciones',
    'y Seller Center.',
    '',
    '## stack',
    '· VueJS  · JavaScript  · CSS  · HTML',
    '· Git  · GitHub  · Laravel  · Vtex  · AWS',
  ],

  'experience/empresa-virtual.md': [
    '# empresa-virtual.md',
    '',
    '## Empresa Virtual  ·  2021',
    'Desarrollador Jr.',
    '',
    '## description',
    'Dashboards de alta disponibilidad para reportes',
    'de prevención y mantenimiento. Desarrollo y soporte',
    'de la aplicación "Sumapp", integración con sistemas',
    'externos.',
    '',
    '## stack',
    '· VueJS  · JavaScript  · CSS  · HTML',
    '· Git  · GitHub  · Laravel  · Docker  · AWS',
  ],

  'projects/visa-electronica.md': [
    '# visa-electronica.md',
    '',
    '## Visa Electrónica',
    'Sistema de visado electrónico — SRE México',
    '',
    '## company',
    'INFOTEC  ·  2023',
    '',
    '## description',
    'Sistema de visado electrónico desarrollado para la',
    'Secretaría de Relaciones Exteriores de México.',
    'Implementación de alcance internacional.',
    '',
    '## stack',
    '· Laravel  · PostgreSQL  · VueJS  · Quasar',
    '· TailwindCSS  · Figma  · UX/UI',
  ],

  'projects/sipf.md': [
    '# sipf.md',
    '',
    '## SIPF — Sistema Penitenciario Federal',
    'Microservicios para el sistema penitenciario',
    '',
    '## company',
    'B-process  ·  2025',
    '',
    '## description',
    'Lideré el desarrollo de microservicios mejorando',
    'la eficiencia del sistema en un 20%.',
    '',
    '## stack',
    '· Spring Boot  · Docker  · Kubernetes',
    '· Oracle DB  · Angular  · GitHub Actions',
  ],

  'projects/seller-center.md': [
    '# seller-center.md',
    '',
    '## Seller Center',
    'Plataforma de gestión para vendedores',
    '',
    '## company',
    'doto.com.mx  ·  2022',
    '',
    '## description',
    'Middleware entre sellers y usuarios finales.',
    'Mantenimiento y mejoras de la plataforma de',
    'Seller Center.',
    '',
    '## stack',
    '· VueJS  · Laravel  · Vtex  · JavaScript',
    '· CSS  · HTML  · Git  · AWS',
  ],

  'projects/sumapp.md': [
    '# sumapp.md',
    '',
    '## Sumapp',
    'Aplicación de gestión empresarial',
    '',
    '## company',
    'Empresa Virtual  ·  2021',
    '',
    '## description',
    'Dashboards de alta disponibilidad.',
    'Reportes de prevención y mantenimiento.',
    'Integración con sistemas externos.',
    '',
    '## stack',
    '· VueJS  · JavaScript  · Laravel',
    '· Docker  · AWS  · CSS  · HTML',
  ],

  'skills.md': [
    '# skills.md',
    '',
    '## backend',
    '· PHP / Laravel',
    '· NodeJS',
    '· Java / Spring Boot',
    '· C# / .NET',
    '· Golang',
    '',
    '## frontend',
    '· VueJS  · Angular  · React',
    '· CSS / Tailwind / Bootstrap',
    '· Figma  ·  UX/UI',
    '· Quasar  ·  Angular Material',
    '',
    '## databases',
    '· SQL  ·  NoSQL',
    '· PostgreSQL  ·  MySQL  ·  Oracle',
    '',
    '## devops',
    '· Docker  ·  Kubernetes',
    '· Git  ·  CI/CD',
    '· Linux / Bash',
    '',
    '## extras',
    '· Vtex  ·  Shopify',
    '· Pruebas unitarias (frontend + backend)',
    '· Arquitectura hexagonal  ·  SCRUM',
  ],

  'certifications.md': [
    '# certifications.md',
    '',
    '## education',
    '→  Ingeniería en Tecnologías de la Información',
    '   Instituto Tecnológico de Toluca  ·  Jul 2022',
    '',
    '→  Técnico en Informática',
    '   CBT No. 3 Toluca  ·  Jul 2017',
    '',
    '## courses',
    '→  Microservicios: Docker, Kubernetes, Spring Boot, AWS ECS/EKS',
    '   Udemy  ·  Enero 2025',
    '',
    '→  Arquitectura de Software: DDD, CQRS, Eventos, Microservicios',
    '   Udemy  ·  Marzo 2025',
    '',
    '→  Tailwind CSS: Utilidades básicas y diseño avanzado',
    '   Udemy  ·  Junio 2023',
    '',
    '→  Vue 3: CLI, Router, Vuex, Composition API',
    '   Udemy  ·  Julio 2023',
    '',
    '→  Java Full Stack: Spring, Hibernate, JakartaEE',
    '   Udemy  ·  Agosto 2025',
  ],

  'contact.md': [
    '# contact.md',
    '',
    '## email',
    'gonzalezgarciaivandejesus@gmail.com',
    '',
    '## phone',
    '+52 729-109-7554',
    '',
    '## linkedin',
    'linkedin.com/in/gonzalezgivan2000',
    '',
    '## location',
    'Ciudad de México, México',
    '',
    '## availability',
    '· open to freelance projects',
    '· open to full-time opportunities',
  ],
}

// ─── Project images map ───────────────────────────────────────────────────────

const fileImages: Record<string, string> = {
  'projects/visa-electronica.md': visaElectronica,
  'projects/sipf.md': sipf,
  'projects/seller-center.md': sellerCenter,
  'projects/sumapp.md': sumapp,
}

// ─── State ────────────────────────────────────────────────────────────────────

const openTabs = ref<string[]>(['README.md'])
const activeTab = ref('README.md')
const terminalOpen = ref(true)
const expandedDirs = ref<Set<string>>(new Set(['experience', 'projects']))

const currentContent = computed(() => fileContents[activeTab.value] ?? ['# not found', '', 'File does not exist.'])
const currentImage = computed(() => fileImages[activeTab.value] ?? null)

// ─── Actions ──────────────────────────────────────────────────────────────────

function openFile(path: string) {
  if (!openTabs.value.includes(path)) {
    openTabs.value.push(path)
  }
  activeTab.value = path
}

function closeTab(path: string) {
  const idx = openTabs.value.indexOf(path)
  openTabs.value.splice(idx, 1)
  if (activeTab.value === path) {
    activeTab.value = openTabs.value[Math.max(0, idx - 1)] ?? ''
  }
}

function toggleDir(path: string) {
  if (expandedDirs.value.has(path)) {
    expandedDirs.value.delete(path)
  } else {
    expandedDirs.value.add(path)
  }
}

// ─── Flat tree for sidebar ────────────────────────────────────────────────────

const flatTree = computed(() => {
  const result: Array<{ node: FileNode; depth: number }> = []
  function walk(nodes: FileNode[], depth: number) {
    for (const node of nodes) {
      result.push({ node, depth })
      if (node.type === 'dir' && expandedDirs.value.has(node.path) && node.children) {
        walk(node.children, depth + 1)
      }
    }
  }
  walk(fileTree, 0)
  return result
})

function fileIcon(node: FileNode): string {
  if (node.type === 'dir') return expandedDirs.value.has(node.path) ? '▾' : '▸'
  if (node.name.endsWith('.md')) return '·'
  if (node.name.endsWith('.pdf')) return '·'
  return '·'
}

function tabName(path: string): string {
  return path.split('/').pop() ?? path
}
</script>

<template>
  <div class="vt-window">
    <!-- Title bar -->
    <div class="vt-titlebar">
      <div class="vt-lights">
        <span class="tl tl-r"></span>
        <span class="tl tl-y"></span>
        <span class="tl tl-g"></span>
      </div>
      <span class="vt-window-title">~/portfolio</span>
      <span class="vt-window-right">igonzalez</span>
    </div>

    <!-- Tab bar -->
    <div class="vt-tabbar">
      <div
        v-for="tab in openTabs"
        :key="tab"
        :class="['vt-tab', { 'vt-tab--active': tab === activeTab }]"
        @click="activeTab = tab"
      >
        <span class="vt-tab-name">{{ tabName(tab) }}</span>
        <button
          class="vt-tab-close"
          @click.stop="closeTab(tab)"
          aria-label="Cerrar tab"
        >×</button>
      </div>
    </div>

    <!-- Main layout: sidebar + editor -->
    <div class="vt-main">
      <!-- Sidebar -->
      <aside class="vt-sidebar">
        <div class="sidebar-label">EXPLORER</div>
        <div class="vt-filetree">
          <div
            v-for="item in flatTree"
            :key="item.node.path"
            :class="[
              'ft-item',
              item.node.type === 'dir' ? 'ft-dir' : 'ft-file',
              { 'ft-active': activeTab === item.node.path },
            ]"
            :style="{ paddingLeft: `${item.depth * 14 + 8}px` }"
            @click="item.node.type === 'dir' ? toggleDir(item.node.path) : openFile(item.node.path)"
          >
            <span class="ft-icon">{{ fileIcon(item.node) }}</span>
            <span class="ft-name">{{ item.node.name }}</span>
          </div>
        </div>

        <!-- Sidebar bottom: git info -->
        <div class="sidebar-bottom">
          <div class="git-label">GIT ————</div>
          <div class="git-info">branch · main · clean</div>
        </div>
      </aside>

      <!-- Editor -->
      <EditorPane
        :content="currentContent"
        :filename="activeTab"
        :image="currentImage"
      />
    </div>

    <!-- Terminal panel -->
    <TerminalPane
      v-if="terminalOpen"
      :file-contents="fileContents"
      @open-file="openFile"
    />

    <!-- Status bar -->
    <div class="vt-statusbar">
      <div class="sb-left">
        <span class="sb-chip sb-branch">⎇ main</span>
        <span class="sb-chip">UTF-8</span>
        <span class="sb-chip">LF</span>
      </div>
      <div class="sb-right">
        <span class="sb-chip">{{ activeTab }}</span>
        <button
          class="sb-chip sb-terminal-btn"
          @click="terminalOpen = !terminalOpen"
        >
          {{ terminalOpen ? '⌃` terminal' : '⌃` terminal' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Variables ────────────────────────────────────────────────────────────── */
.vt-window {
  --bg:          #f5f2ec;
  --bg-sidebar:  #ede9e1;
  --bg-tab:      #e8e4dc;
  --bg-active:   #f5f2ec;
  --bg-hover:    #e4e0d8;
  --bg-selected: #dbd6cc;
  --border:      #cfc9c0;
  --text:        #2a2420;
  --text-muted:  #7a7060;
  --accent:      #9b2335;
  --accent-b:    #1c4f7a;
  --status-bg:   #2a2420;
  --status-text: #b0a898;
  --font-mono:   'Menlo', 'Monaco', 'Cascadia Code', 'Courier New', monospace;

  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg);
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  overflow: hidden;
}

/* ── Title bar ────────────────────────────────────────────────────────────── */
.vt-titlebar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 32px;
  min-height: 32px;
  background: var(--bg-sidebar);
  border-bottom: 1px solid var(--border);
  padding: 0 12px;
  user-select: none;
}

.vt-lights {
  display: flex;
  gap: 6px;
  align-items: center;
}

.tl {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}

.tl-r { background: #ff5f56; }
.tl-y { background: #ffbd2e; }
.tl-g { background: #27c93f; }

.vt-window-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.vt-window-right {
  font-size: 11px;
  color: var(--text-muted);
}

/* ── Tab bar ──────────────────────────────────────────────────────────────── */
.vt-tabbar {
  display: flex;
  background: var(--bg-sidebar);
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
  min-height: 34px;
  align-items: stretch;
}

.vt-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  border-right: 1px solid var(--border);
  background: var(--bg-tab);
  color: var(--text-muted);
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  transition: background 0.1s;
}

.vt-tab:hover {
  background: var(--bg-hover);
}

.vt-tab--active {
  background: var(--bg-active);
  color: var(--text);
  border-bottom: 1px solid var(--bg-active);
  margin-bottom: -1px;
}

.vt-tab-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vt-tab-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0 2px;
  font-size: 14px;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.1s;
}

.vt-tab:hover .vt-tab-close,
.vt-tab--active .vt-tab-close {
  opacity: 1;
}

.vt-tab-close:hover {
  color: var(--text);
}

/* ── Main layout ──────────────────────────────────────────────────────────── */
.vt-main {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
.vt-sidebar {
  width: 220px;
  min-width: 220px;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  padding: 10px 8px 6px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
}

.vt-filetree {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.ft-item {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 12px;
  transition: background 0.1s, color 0.1s;
  white-space: nowrap;
  overflow: hidden;
}

.ft-item:hover {
  background: var(--bg-hover);
  color: var(--text);
}

.ft-active {
  background: var(--bg-selected) !important;
  color: var(--text) !important;
}

.ft-dir {
  font-weight: 600;
  color: var(--text);
}

.ft-icon {
  font-size: 10px;
  color: var(--text-muted);
  width: 14px;
  text-align: center;
  flex-shrink: 0;
}

.ft-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-bottom {
  padding: 10px 8px 10px;
  border-top: 1px solid var(--border);
  font-size: 10px;
  color: var(--text-muted);
}

.git-label {
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 3px;
}

.git-info {
  color: var(--text-muted);
  font-size: 10px;
}

/* ── Status bar ───────────────────────────────────────────────────────────── */
.vt-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  min-height: 24px;
  background: var(--status-bg);
  padding: 0 8px;
  color: var(--status-text);
  font-size: 11px;
}

.sb-left,
.sb-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sb-chip {
  opacity: 0.75;
  white-space: nowrap;
}

.sb-branch {
  color: #6ca8e0;
  opacity: 1;
}

.sb-terminal-btn {
  background: none;
  border: none;
  color: var(--status-text);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 0;
  opacity: 0.75;
  transition: opacity 0.15s;
}

.sb-terminal-btn:hover {
  opacity: 1;
}

/* ── Scrollbar styling ────────────────────────────────────────────────────── */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
</style>
