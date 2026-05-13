<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'

const props = defineProps<{
  archivos: Record<string, import('@/data/files').FileData>
  altura: number
}>()

const emit = defineEmits<{
  abrirArchivo: [ruta: string]
  redimensionar: [altura: number]
}>()

// ─── Estado ───────────────────────────────────────────────────────────────────

interface EntradaHistorial {
  cmd: string
  salida: string[]
}

const historial = ref<EntradaHistorial[]>([])
const inputValor = ref('')
const cmdHistorial = ref<string[]>([])
const cmdIdx = ref(-1)
const dirActual = ref('portfolio')
const outputRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const bienvenidaLista = ref(false)
const bienvenidaLineas = ref<string[]>([])
const mostrandoBienvenida = ref(true)

// ─── Resize vertical ──────────────────────────────────────────────────────────

function iniciarResize(e: MouseEvent | TouchEvent) {
  if (window.innerWidth < 768) return
  const alturaInicial = props.altura
  const yInicial = e instanceof MouseEvent ? e.clientY : e.touches[0]!.clientY

  const mover = (ev: MouseEvent | TouchEvent) => {
    const y = ev instanceof MouseEvent ? ev.clientY : ev.touches[0]!.clientY
    const delta = yInicial - y
    const nueva = Math.min(Math.max(alturaInicial + delta, 100), window.innerHeight * 0.75)
    emit('redimensionar', nueva)
  }

  const soltar = () => {
    window.removeEventListener('mousemove', mover)
    window.removeEventListener('touchmove', mover)
    window.removeEventListener('mouseup', soltar)
    window.removeEventListener('touchend', soltar)
  }

  window.addEventListener('mousemove', mover)
  window.addEventListener('touchmove', mover)
  window.addEventListener('mouseup', soltar)
  window.addEventListener('touchend', soltar)
}

// ─── Ejecución de comandos ────────────────────────────────────────────────────

function ejecutarCmd(rawCmd: string): string[] {
  const partes = rawCmd.trim().split(/\s+/)
  const cmd = partes[0]?.toLowerCase() ?? ''
  const args = partes.slice(1)

  switch (cmd) {
    case 'whoami':
      return [
        'Iván González García  ·  full-stack engineer',
        'Ciudad de México  ·  4+ años  ·  abierto a roles',
      ]

    case 'pwd':
      return [`/home/igonzalez/${dirActual.value}`]

    case 'clear':
      historial.value = []
      return []

    case 'help':
      return [
        'comandos disponibles',
        '',
        '  whoami              muestra identidad del desarrollador',
        '  ls [dir/]           lista archivos del directorio',
        '  cat <archivo>       imprime contenido de un archivo',
        '  open <archivo>      abre archivo en el editor',
        '  stack               muestra stack tecnológico completo',
        '  contact             información de contacto',
        '  git log --oneline   historial de commits',
        '  pwd                 directorio de trabajo actual',
        '  cd <dir>            cambia de directorio',
        '  clear               limpia la pantalla',
        '  help                muestra este mensaje',
      ]

    case 'ls': {
      const objetivo = (args[0] ?? '').replace('--featured', '').trim().replace(/\/$/, '') || dirActual.value
      return listarDir(objetivo)
    }

    case 'cd': {
      const destino = (args[0] ?? '').replace(/\/$/, '')
      if (!destino || destino === '..') { dirActual.value = 'portfolio'; return [] }
      if (['experiencia', 'proyectos', 'portfolio'].includes(destino)) {
        dirActual.value = destino
        return []
      }
      return [`cd: ${destino}: directorio no encontrado`]
    }

    case 'cat': {
      const archivo = args[0] ?? ''
      const ruta = resolverArchivo(archivo)
      if (!ruta) return [`cat: ${archivo}: archivo no encontrado`]
      emit('abrirArchivo', ruta)
      const datos = props.archivos[ruta]
      if (!datos) return [`cat: ${archivo}: archivo no encontrado`]
      return datos.code.slice(0, 18).concat(datos.code.length > 18 ? ['// ...'] : [])
    }

    case 'open': {
      const archivo = args[0] ?? ''
      const ruta = resolverArchivo(archivo)
      if (!ruta) return [`open: ${archivo}: archivo no encontrado`]
      emit('abrirArchivo', ruta)
      return [`abriendo ${ruta} en el editor...`]
    }

    case 'stack':
      return [
        'backend   · Laravel · Spring Boot · Docker · Kubernetes · Golang',
        'frontend  · VueJS · Angular · React · TailwindCSS',
        'databases · PostgreSQL · MySQL · Oracle',
        'devops    · Docker · Kubernetes · Git · CI/CD · Linux',
        'extras    · Vtex · Shopify · Arquitectura Hexagonal · SCRUM',
      ]

    case 'contact':
      return [
        'mail      — gonzalezgarciaivandejesus@gmail.com',
        'teléfono  — +52 729-109-7554',
        'linkedin  — /in/gonzalezgivan2000',
      ]

    case 'git': {
      if (args[0] === 'log' && args[1] === '--oneline') {
        return [
          'd5866f0  feat: rediseño terminal — portfolio_cli v2',
          '0171c31  feat: visa electronica — sistema SRE',
          'bd954c3  feat: sipf microservicios — B-process',
          '7cef59f  feat: seller center — doto.com.mx',
          'fed2fab  feat: sumapp dashboards',
          'a1b2c3d  init: proyecto inicializado',
        ]
      }
      return [`git: comando desconocido '${args.join(' ')}'`]
    }

    case '':
      return []

    default:
      return [`${cmd}: comando no encontrado  (prueba 'help')`]
  }
}

function resolverArchivo(input: string): string | null {
  if (!input) return null
  if (props.archivos[input]) return input
  if (dirActual.value !== 'portfolio') {
    const conDir = `${dirActual.value}/${input}`
    if (props.archivos[conDir]) return conDir
  }
  const conVue = input.endsWith('.vue') ? input : `${input}.vue`
  if (props.archivos[conVue]) return conVue
  if (dirActual.value !== 'portfolio') {
    const conDirVue = `${dirActual.value}/${conVue}`
    if (props.archivos[conDirVue]) return conDirVue
  }
  return null
}

function listarDir(dir: string): string[] {
  if (dir === 'portfolio' || dir === '.' || !dir) {
    return [
      'inicio.vue           —',
      'experiencia/         4 archivos',
      'proyectos/           4 archivos',
      'habilidades.vue      —',
      'certificaciones.vue  —',
      'contacto.vue         —',
    ]
  }
  if (dir === 'experiencia') {
    return ['b-process.vue        2025  →', 'infotec.vue          2023  →', 'doto.vue             2022  →', 'empresa-virtual.vue  2021  →']
  }
  if (dir === 'proyectos') {
    return ['visa-electronica.vue  2023  →', 'sipf.vue              2025  →', 'seller-center.vue     2022  →', 'sumapp.vue            2021  →']
  }
  return [`ls: ${dir}: directorio no encontrado`]
}

// ─── Input ────────────────────────────────────────────────────────────────────

function enviarComando() {
  const raw = inputValor.value.trim()
  if (!raw) return
  cmdHistorial.value.unshift(raw)
  cmdIdx.value = -1
  const salida = ejecutarCmd(raw)
  if (raw !== 'clear') historial.value.push({ cmd: raw, salida })
  inputValor.value = ''
  scrollFondo()
}

function historialArriba() {
  if (cmdIdx.value < cmdHistorial.value.length - 1) {
    cmdIdx.value++
    inputValor.value = cmdHistorial.value[cmdIdx.value] ?? ''
  }
}

function historialAbajo() {
  if (cmdIdx.value > 0) {
    cmdIdx.value--
    inputValor.value = cmdHistorial.value[cmdIdx.value] ?? ''
  } else {
    cmdIdx.value = -1
    inputValor.value = ''
  }
}

function scrollFondo() {
  nextTick(() => {
    if (outputRef.value) outputRef.value.scrollTop = outputRef.value.scrollHeight
  })
}

function focusInput() {
  inputRef.value?.focus()
}

// ─── Mensaje de bienvenida con animación ──────────────────────────────────────

const BIENVENIDA = [
  'portfolio_cli v2.0  —  por Iván González García',
  '════════════════════════════════════════════════',
  '',
  'comandos disponibles:',
  '',
  '  whoami              muestra identidad del desarrollador',
  '  ls [dir/]           lista archivos del directorio',
  '  cat <archivo>       imprime contenido de un archivo',
  '  open <archivo>      abre archivo en el editor',
  '  stack               muestra stack tecnológico completo',
  '  contact             información de contacto',
  '  git log --oneline   historial de commits',
  '  pwd                 directorio de trabajo actual',
  '  cd <dir>            cambia de directorio',
  '  clear               limpia la pantalla',
  '  help                muestra este mensaje',
  '',
]

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

async function animarBienvenida() {
  for (const linea of BIENVENIDA) {
    let buf = ''
    const idx = bienvenidaLineas.value.push('') - 1
    if (linea === '') {
      await sleep(40)
      continue
    }
    for (const ch of linea) {
      buf += ch
      bienvenidaLineas.value[idx] = buf
      await sleep(16)
    }
    await sleep(20)
  }
  bienvenidaLista.value = true
  await nextTick()
  inputRef.value?.focus()
}

onMounted(() => {
  animarBienvenida()
})

// ─── Renderer de salida ───────────────────────────────────────────────────────

function renderLineaOutput(linea: string): string {
  if (!linea) return '&nbsp;'

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const sp = (cls: string, t: string) => `<span class="to-${cls}">${t}</span>`

  // git hash
  if (/^[a-f0-9]{7}\s/.test(linea)) {
    return sp('hash', linea.slice(0, 7)) + '  ' + sp('text', esc(linea.slice(8)))
  }
  // contact — value
  if (/^\w[\w\s]*\s+—\s/.test(linea)) {
    const m = linea.match(/^([\w\s]+?)\s+—\s+(.+)$/)
    if (m) return sp('clave', esc(m[1] ?? '')) + '  ' + sp('sep', '—') + '  ' + sp('val', esc(m[2] ?? ''))
  }
  // stack: category · items
  if (/^\w+\s{2,}·/.test(linea)) {
    const espacio = linea.indexOf('  ')
    return sp('cat', esc(linea.slice(0, espacio))) + sp('stack', esc(linea.slice(espacio)))
  }
  // ls row con →
  if (linea.includes('  →')) {
    const [nom = '', ...resto] = linea.split(/\s{2,}/)
    return sp('fname', esc(nom)) + '  ' + sp('muted', esc(resto.join('  ')))
  }
  // indented help line
  if (linea.startsWith('  ')) return sp('indent', esc(linea))
  // separador ════
  if (/^[═─━]+$/.test(linea.trim())) return sp('sep', esc(linea))
  // error
  if (linea.includes('no encontrado') || linea.includes('desconocido')) return sp('error', esc(linea))

  return sp('text', esc(linea))
}

function renderLineaBienvenida(linea: string): string {
  if (!linea) return '&nbsp;'
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const sp = (cls: string, t: string) => `<span class="to-${cls}">${t}</span>`
  if (/^[═─━]+$/.test(linea.trim())) return sp('sep', esc(linea))
  if (linea.startsWith('  ')) return sp('indent', esc(linea))
  if (linea.startsWith('portfolio_cli')) return sp('titulo', esc(linea))
  if (linea.endsWith(':')) return sp('section', esc(linea))
  return sp('text', esc(linea))
}
</script>

<template>
  <div class="terminal-pane" :style="{ height: altura + 'px' }">
    <!-- Handle de resize -->
    <div class="t-resize-handle" @mousedown.prevent="iniciarResize" @touchstart.prevent="iniciarResize">
      <div class="handle-linea"></div>
    </div>

    <!-- Header -->
    <div class="t-header">
      <span class="t-label">TERMINAL</span>
      <span class="t-path">~/{{ dirActual }}</span>
      <div class="t-header-right">
        <span class="t-bash">bash</span>
      </div>
    </div>

    <!-- Output -->
    <div class="t-output" ref="outputRef" @click="focusInput">
      <!-- Bienvenida animada -->
      <div v-if="mostrandoBienvenida" class="t-bienvenida">
        <div
          v-for="(linea, i) in bienvenidaLineas"
          :key="'bv-' + i"
          class="t-out-linea"
          v-html="renderLineaBienvenida(linea)"
        />
        <span v-if="!bienvenidaLista" class="t-cursor-inline">█</span>
      </div>

      <!-- Historial de comandos -->
      <div v-for="(entrada, i) in historial" :key="i" class="t-entrada">
        <div class="t-cmd-fila">
          <span class="t-prompt">›</span>
          <span class="t-cmd">{{ entrada.cmd }}</span>
        </div>
        <div
          v-for="(linea, j) in entrada.salida"
          :key="j"
          class="t-out-linea"
          v-html="renderLineaOutput(linea)"
        />
      </div>
    </div>

    <!-- Input -->
    <div class="t-input-fila">
      <span class="t-prompt">›</span>
      <span class="t-input-display">{{ inputValor }}</span>
      <span class="t-cursor">█</span>
      <input
        ref="inputRef"
        v-model="inputValor"
        class="t-input-real"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        @keydown.enter="enviarComando"
        @keydown.up.prevent="historialArriba"
        @keydown.down.prevent="historialAbajo"
      />
    </div>
  </div>
</template>

<style scoped>
.terminal-pane {
  --t-bg:      #1e2030;
  --t-border:  #1a1b2e;
  --t-text:    #c0caf5;
  --t-muted:   #565f89;
  --t-prompt:  #9ece6a;
  --t-blue:    #7aa2f7;
  --t-green:   #9ece6a;
  --t-error:   #f7768e;
  --font:      'Menlo', 'Monaco', 'Cascadia Code', 'Courier New', monospace;

  display: flex;
  flex-direction: column;
  background: var(--t-bg);
  border-top: 1px solid var(--t-border);
  font-family: var(--font);
  font-size: 12.5px;
  color: var(--t-text);
  overflow: hidden;
  flex-shrink: 0;
}

/* Handle de resize */
.t-resize-handle {
  height: 6px;
  min-height: 6px;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1b2e;
  border-bottom: 1px solid var(--t-border);
  transition: background 0.15s;
  touch-action: none;
}

.t-resize-handle:hover { background: #283457; }

.handle-linea {
  width: 32px;
  height: 2px;
  background: var(--t-muted);
  border-radius: 1px;
}

/* Header */
.t-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 26px;
  min-height: 26px;
  padding: 0 10px;
  background: #1f2335;
  border-bottom: 1px solid var(--t-border);
  font-size: 10px;
}

.t-label { font-weight: 700; color: var(--t-muted); text-transform: uppercase; letter-spacing: 0.08em; }
.t-path  { color: var(--t-muted); opacity: 0.6; }
.t-header-right { margin-left: auto; }
.t-bash  { color: var(--t-muted); opacity: 0.5; font-size: 10px; }

/* Output */
.t-output {
  flex: 1;
  overflow-y: auto;
  padding: 8px 10px 4px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  cursor: text;
}

.t-bienvenida { margin-bottom: 8px; }

.t-entrada { display: flex; flex-direction: column; gap: 1px; margin-bottom: 6px; }

.t-cmd-fila { display: flex; align-items: baseline; gap: 8px; min-height: 18px; }

.t-prompt { color: var(--t-prompt); font-weight: 700; font-size: 13px; flex-shrink: 0; }
.t-cmd    { color: var(--t-text); font-weight: 500; }

.t-cursor-inline {
  color: var(--t-text);
  animation: parpadeo 1s step-end infinite;
  font-size: 11px;
}

.t-out-linea {
  padding-left: 18px;
  min-height: 18px;
  line-height: 18px;
  color: var(--t-text);
  white-space: pre;
}

/* Tokens de output */
.t-out-linea :deep(.to-titulo)  { color: var(--t-blue); font-weight: 700; }
.t-out-linea :deep(.to-section) { color: var(--t-muted); }
.t-out-linea :deep(.to-hash)    { color: var(--t-green); font-weight: 700; }
.t-out-linea :deep(.to-text)    { color: var(--t-text); }
.t-out-linea :deep(.to-clave)   { color: var(--t-blue); font-weight: 600; }
.t-out-linea :deep(.to-sep)     { color: var(--t-muted); }
.t-out-linea :deep(.to-val)     { color: var(--t-text); }
.t-out-linea :deep(.to-cat)     { color: var(--t-blue); font-weight: 600; display: inline-block; min-width: 80px; }
.t-out-linea :deep(.to-stack)   { color: var(--t-text); }
.t-out-linea :deep(.to-indent)  { color: var(--t-muted); }
.t-out-linea :deep(.to-fname)   { color: var(--t-blue); font-weight: 600; }
.t-out-linea :deep(.to-muted)   { color: var(--t-muted); }
.t-out-linea :deep(.to-error)   { color: var(--t-error); }

/* Input row */
.t-input-fila {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  min-height: 32px;
  padding: 0 10px;
  border-top: 1px solid var(--t-border);
  background: var(--t-bg);
  position: relative;
}

.t-input-display {
  font-family: var(--font);
  font-size: 12.5px;
  color: var(--t-text);
  white-space: pre;
  pointer-events: none;
}

.t-cursor {
  color: var(--t-text);
  animation: parpadeo 1s step-end infinite;
  font-size: 11px;
  pointer-events: none;
}

/* Input real: invisible, superpuesto */
.t-input-real {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: text;
  background: none;
  border: none;
  outline: none;
  font-family: var(--font);
  font-size: 12.5px;
  color: transparent;
  caret-color: transparent;
}

@keyframes parpadeo {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@media (max-width: 767px) {
  .terminal-pane {
    height: 200px !important;
  }
  .t-resize-handle {
    cursor: default;
  }
}
</style>
