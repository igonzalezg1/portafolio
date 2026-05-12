<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PreviewType, PreviewData, InicioData, ExperienciaData, ProyectoData, HabilidadesData, CertificacionesData, ContactoData } from '@/data/files'

// ─── Props ────────────────────────────────────────────────────────────────────

const props = defineProps<{
  codigo: string[]
  previewType: PreviewType
  previewData: PreviewData
  archivo: string
}>()

// ─── Split resize horizontal ──────────────────────────────────────────────────

const splitPct = ref(50)
const arrastrando = ref(false)
const contenedorRef = ref<HTMLElement | null>(null)

function iniciarArrastre(e: MouseEvent | TouchEvent) {
  arrastrando.value = true
  const mover = (ev: MouseEvent | TouchEvent) => {
    if (!contenedorRef.value) return
    const clientX = ev instanceof MouseEvent ? ev.clientX : ev.touches[0]!.clientX
    const rect = contenedorRef.value.getBoundingClientRect()
    const pct = Math.min(80, Math.max(20, ((clientX - rect.left) / rect.width) * 100))
    splitPct.value = pct
  }
  const soltar = () => {
    arrastrando.value = false
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

// ─── Vista activa (móvil) ─────────────────────────────────────────────────────

const vistaActiva = ref<'codigo' | 'preview'>('codigo')

// ─── Syntax highlighter ───────────────────────────────────────────────────────

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function sp(cls: string, t: string): string {
  return `<span class="syn-${cls}">${t}</span>`
}

function highlightTag(s: string): string {
  const escapado = esc(s)
  return escapado
    .replace(/(&lt;\/?)([\w-]+)/g, (_, lt, nm: string) => lt + sp('tag', nm))
    .replace(/\b(v-[\w:-]+|:[a-z][\w-]*|@[\w]+)/g, (m) => sp('dir', m))
    .replace(/="([^"]*)"/g, (_, v: string) => `=${sp('str', `"${v}"`)}`)
    .replace(/\{\{([^}]+)\}\}/g, (_, e2: string) => sp('expr', `{{${e2}}}`))
    .replace(/\b(class|style|src|alt|href|type|id|for|name|placeholder)\b(?==)/g, (m) => sp('attr', m))
}

function highlightScript(s: string): string {
  const segmentos: Array<{ tipo: 's' | 'c'; texto: string }> = []
  let inStr = false
  let strCh = ''
  let buf = ''

  for (let i = 0; i < s.length; i++) {
    const ch = s[i]!
    if (!inStr) {
      if (ch === "'" || ch === '"' || ch === '`') {
        if (buf) segmentos.push({ tipo: 'c', texto: buf })
        buf = ch
        inStr = true
        strCh = ch
      } else {
        buf += ch
      }
    } else {
      buf += ch
      if (ch === strCh && s[i - 1] !== '\\') {
        segmentos.push({ tipo: 's', texto: buf })
        buf = ''
        inStr = false
      }
    }
  }
  if (buf) segmentos.push({ tipo: inStr ? 's' : 'c', texto: buf })

  return segmentos
    .map((seg) => {
      if (seg.tipo === 's') return sp('str', esc(seg.texto))
      return esc(seg.texto)
        .replace(
          /\b(const|let|var|interface|type|ref|computed|watch|onMounted|defineProps|defineEmits|import|from|export|default|return|if|else|for|of|in|async|await|function|class|extends|new|true|false|null|undefined)\b/g,
          (m) => sp('kw', m),
        )
        .replace(/\b(string|number|boolean|void|any|never|Record|Array|Ref|Computed|Promise)\b/g, (m) => sp('type', m))
        .replace(/\b(\d+)\b/g, (m) => sp('num', m))
    })
    .join('')
}

function resaltar(linea: string): string {
  if (!linea.trim()) return ' '
  const indent = (linea.match(/^(\s*)/) ?? ['', ''])[1]!
  const rest = linea.slice(indent.length)
  const indentHtml = indent.replace(/ /g, ' ')

  if (rest.startsWith('//')) return indentHtml + sp('comment', esc(rest))
  if (rest.startsWith('<')) return indentHtml + highlightTag(rest)
  return indentHtml + highlightScript(rest)
}

// ─── Tipado de previewData ────────────────────────────────────────────────────

const inicio    = computed(() => props.previewData as InicioData)
const exp       = computed(() => props.previewData as ExperienciaData)
const proyecto  = computed(() => props.previewData as ProyectoData)
const hab       = computed(() => props.previewData as HabilidadesData)
const certs     = computed(() => props.previewData as CertificacionesData)
const contacto  = computed(() => props.previewData as ContactoData)
</script>

<template>
  <div ref="contenedorRef" class="editor-pane" :class="{ arrastrando }">

    <!-- ── Selector de vista (solo móvil) ──────────────────────────────────── -->
    <div class="vista-tabs">
      <button :class="['vtab', { active: vistaActiva === 'codigo' }]" @click="vistaActiva = 'codigo'">
        Código
      </button>
      <button :class="['vtab', { active: vistaActiva === 'preview' }]" @click="vistaActiva = 'preview'">
        Vista previa
      </button>
    </div>

    <!-- ── Panel de código ────────────────────────────────────────────────── -->
    <div
      class="panel codigo-panel"
      :class="{ 'panel-oculto-movil': vistaActiva !== 'codigo' }"
      :style="{ width: splitPct + '%' }"
    >
      <div class="panel-header">
        <span class="panel-titulo">{{ archivo }}</span>
        <span class="lang-badge">TypeScript Vue</span>
      </div>
      <div class="codigo-scroll">
        <div class="codigo-lineas">
          <div v-for="(linea, i) in codigo" :key="i" class="cod-linea">
            <span class="ln">{{ i + 1 }}</span>
            <span class="cod" v-html="resaltar(linea)" />
          </div>
        </div>
      </div>
    </div>

    <!-- ── Divisor horizontal ────────────────────────────────────────────── -->
    <div class="divisor-h" @mousedown.prevent="iniciarArrastre" @touchstart.prevent="iniciarArrastre">
      <div class="divisor-linea" />
    </div>

    <!-- ── Panel de vista previa ─────────────────────────────────────────── -->
    <div
      class="panel preview-panel"
      :class="{ 'panel-oculto-movil': vistaActiva !== 'preview' }"
      :style="{ width: (100 - splitPct) + '%' }"
    >
      <div class="panel-header">
        <span class="panel-titulo">Vista previa</span>
        <span class="preview-badge">{{ archivo }}</span>
      </div>
      <div class="preview-scroll">

        <!-- ── INICIO ─────────────────────────────────────────────────────── -->
        <template v-if="previewType === 'inicio'">
          <div class="pv-inicio">
            <div class="pv-rol-badge">full-stack developer</div>
            <h1 class="pv-nombre">{{ inicio.nombre }}</h1>
            <p class="pv-rol">{{ inicio.rol }}</p>
            <p class="pv-ubicacion">{{ inicio.ubicacion }}</p>

            <div class="pv-stats">
              <div v-for="est in inicio.estadisticas" :key="est.etiqueta" class="pv-stat">
                <span class="pv-stat-val">{{ est.valor }}</span>
                <span class="pv-stat-lbl">{{ est.etiqueta }}</span>
              </div>
            </div>

            <div class="pv-section-label">proyectos destacados</div>
            <div class="pv-proyectos">
              <div v-for="proy in inicio.proyectos" :key="proy.nombre" class="pv-proy">
                <span class="pv-arrow">→</span>
                <span class="pv-proy-nombre">{{ proy.nombre }}</span>
                <span class="pv-proy-desc">{{ proy.descripcion }}</span>
              </div>
            </div>

            <div class="pv-section-label">abierto a</div>
            <div class="pv-abierto">
              <span v-for="a in inicio.abierto" :key="a" class="pv-abierto-item">{{ a }}</span>
            </div>
          </div>
        </template>

        <!-- ── EXPERIENCIA ────────────────────────────────────────────────── -->
        <template v-else-if="previewType === 'experiencia'">
          <div class="pv-exp">
            <div class="pv-exp-meta">
              <span class="pv-año">{{ exp.año }}</span>
              <span class="pv-empresa">{{ exp.empresa }}</span>
            </div>
            <h2 class="pv-cargo">{{ exp.cargo }}</h2>
            <p class="pv-desc">{{ exp.descripcion }}</p>
            <div class="pv-stack">
              <span v-for="t in exp.stack" :key="t" class="pv-tag">{{ t }}</span>
            </div>
          </div>
        </template>

        <!-- ── PROYECTO ───────────────────────────────────────────────────── -->
        <template v-else-if="previewType === 'proyecto'">
          <div class="pv-proyecto">
            <div class="pv-img-wrap">
              <img :src="proyecto.imagen" :alt="proyecto.nombre" class="pv-img" />
            </div>
            <div class="pv-proyecto-info">
              <div class="pv-exp-meta">
                <span class="pv-año">{{ proyecto.año }}</span>
                <span class="pv-empresa">{{ proyecto.empresa }}</span>
              </div>
              <h2 class="pv-proy-titulo">{{ proyecto.nombre }}</h2>
              <p class="pv-desc">{{ proyecto.descripcion }}</p>
              <div class="pv-stack">
                <span v-for="t in proyecto.stack" :key="t" class="pv-tag">{{ t }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- ── HABILIDADES ────────────────────────────────────────────────── -->
        <template v-else-if="previewType === 'habilidades'">
          <div class="pv-hab">
            <div class="pv-section-label">stack tecnológico</div>
            <div class="pv-hab-grid">
              <div v-for="cat in hab.categorias" :key="cat.nombre" class="pv-hab-cat">
                <h3 class="pv-hab-nombre">{{ cat.nombre }}</h3>
                <ul class="pv-hab-list">
                  <li v-for="item in cat.items" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </template>

        <!-- ── CERTIFICACIONES ────────────────────────────────────────────── -->
        <template v-else-if="previewType === 'certificaciones'">
          <div class="pv-certs">
            <div class="pv-section-label">educación</div>
            <div class="pv-cert-grid">
              <div v-for="c in certs.educacion" :key="c.titulo" class="pv-cert-item">
                <h3 class="pv-cert-titulo">{{ c.titulo }}</h3>
                <p class="pv-cert-meta">{{ c.institucion }}<span class="pv-fecha">{{ c.fecha }}</span></p>
              </div>
            </div>
            <div class="pv-section-label" style="margin-top: 1.25rem">cursos</div>
            <div class="pv-cert-grid">
              <div v-for="c in certs.cursos" :key="c.titulo" class="pv-cert-item">
                <h3 class="pv-cert-titulo">{{ c.titulo }}</h3>
                <p class="pv-cert-meta">{{ c.plataforma }}<span class="pv-fecha">{{ c.fecha }}</span></p>
              </div>
            </div>
          </div>
        </template>

        <!-- ── CONTACTO ───────────────────────────────────────────────────── -->
        <template v-else-if="previewType === 'contacto'">
          <div class="pv-contacto">
            <div class="pv-section-label">contacto</div>
            <div class="pv-campo">
              <span class="pv-clave">email</span>
              <a :href="'mailto:' + contacto.email" class="pv-val pv-link">{{ contacto.email }}</a>
            </div>
            <div class="pv-campo">
              <span class="pv-clave">teléfono</span>
              <a :href="'tel:' + contacto.telefono" class="pv-val pv-link">{{ contacto.telefono }}</a>
            </div>
            <div class="pv-campo">
              <span class="pv-clave">linkedin</span>
              <span class="pv-val">{{ contacto.linkedin }}</span>
            </div>
            <div class="pv-campo">
              <span class="pv-clave">ubicación</span>
              <span class="pv-val">{{ contacto.ubicacion }}</span>
            </div>
            <div class="pv-section-label" style="margin-top: 1.25rem">disponible para</div>
            <div class="pv-disponibilidad">
              <span v-for="d in contacto.disponibilidad" :key="d" class="pv-tag">{{ d }}</span>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────────────────── */

.editor-pane {
  --font: 'Menlo', 'Monaco', 'Cascadia Code', 'Courier New', monospace;
  --bg:      #f5f2ec;
  --border:  #cfc9c0;
  --text:    #2a2420;
  --muted:   #7a7060;
  --accent:  #9b2335;
  --blue:    #1c4f7a;

  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
  position: relative;
}

.editor-pane.arrastrando { cursor: col-resize; user-select: none; }

/* Selector de vista (solo visible en móvil) */
.vista-tabs {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  background: #ede9e1;
  border-bottom: 1px solid var(--border);
  z-index: 5;
}

.vtab {
  flex: 1;
  height: 100%;
  background: none;
  border: none;
  border-right: 1px solid var(--border);
  font-family: var(--font);
  font-size: 11px;
  color: var(--muted);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.vtab.active { color: var(--text); background: var(--bg); }
.vtab:last-child { border-right: none; }

/* Paneles */
.panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.panel-oculto-movil { /* solo aplica en móvil, ver media query */ }

/* Header de panel */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  min-height: 28px;
  padding: 0 10px;
  background: #ede9e1;
  border-bottom: 1px solid var(--border);
  font-family: var(--font);
}

.panel-titulo {
  font-size: 11px;
  color: var(--muted);
}

.lang-badge {
  font-size: 10px;
  color: var(--blue);
  background: #deebff44;
  padding: 1px 6px;
  border: 1px solid #1c4f7a33;
}

.preview-badge {
  font-size: 10px;
  color: var(--accent);
  background: #9b233522;
  padding: 1px 6px;
  border: 1px solid #9b233533;
}

/* Divisor horizontal */
.divisor-h {
  width: 5px;
  min-width: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: col-resize;
  background: #ede9e1;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  transition: background 0.15s;
  z-index: 2;
}

.divisor-h:hover { background: #cfc9c0; }

.divisor-linea {
  width: 1px;
  height: 40px;
  background: var(--border);
}

/* ── Código ───────────────────────────────────────────────────────────────────── */

.codigo-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  background: var(--bg);
}

.codigo-lineas {
  padding: 10px 0;
  min-width: max-content;
}

.cod-linea {
  display: flex;
  align-items: baseline;
  min-height: 20px;
  line-height: 20px;
}

.cod-linea:hover { background: rgba(0,0,0,0.02); }

.ln {
  min-width: 44px;
  text-align: right;
  padding-right: 16px;
  font-family: var(--font);
  font-size: 12px;
  color: var(--muted);
  user-select: none;
  flex-shrink: 0;
}

.cod {
  font-family: var(--font);
  font-size: 12.5px;
  color: var(--text);
  white-space: pre;
  padding-right: 20px;
}

/* Syntax tokens */
.cod :deep(.syn-comment) { color: #7a7060; font-style: italic; }
.cod :deep(.syn-tag)     { color: #9b2335; }
.cod :deep(.syn-attr)    { color: #7a5c32; }
.cod :deep(.syn-dir)     { color: #4a7a9b; }
.cod :deep(.syn-str)     { color: #2d6e2d; }
.cod :deep(.syn-expr)    { color: #1c4f7a; }
.cod :deep(.syn-kw)      { color: #6b2a9b; }
.cod :deep(.syn-type)    { color: #1c6a7a; }
.cod :deep(.syn-num)     { color: #7a5c32; }

/* ── Preview ─────────────────────────────────────────────────────────────────── */

.preview-scroll {
  flex: 1;
  overflow-y: auto;
  background: var(--bg);
  padding: 20px 20px;
}

/* Elementos comunes de preview */
.pv-section-label {
  font-family: var(--font);
  font-size: 10px;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  margin-bottom: 0.625rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border);
}

.pv-stack, .pv-disponibilidad {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.pv-tag {
  font-family: var(--font);
  font-size: 11px;
  background: #ebecf0;
  color: var(--text);
  padding: 2px 6px;
}

.pv-desc {
  font-family: var(--font);
  font-size: 12.5px;
  color: #42526e;
  line-height: 1.65;
  margin: 0 0 1rem;
}

/* Inicio */
.pv-inicio { display: flex; flex-direction: column; gap: 1.125rem; }
.pv-rol-badge { font-family: var(--font); font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
.pv-nombre { font-family: var(--font); font-size: clamp(1.25rem, 3vw, 2rem); font-weight: 700; color: var(--text); margin: 0; line-height: 1.1; }
.pv-rol    { font-family: var(--font); font-size: 13px; color: var(--accent); margin: 0; font-weight: 500; }
.pv-ubicacion { font-family: var(--font); font-size: 12px; color: var(--muted); margin: 0; }
.pv-stats { display: flex; gap: 1.5rem; flex-wrap: wrap; padding: 0.75rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.pv-stat  { display: flex; flex-direction: column; gap: 2px; }
.pv-stat-val { font-family: var(--font); font-size: 1.5rem; font-weight: 700; color: var(--blue); line-height: 1; }
.pv-stat-lbl { font-family: var(--font); font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
.pv-proyectos { display: flex; flex-direction: column; gap: 0.375rem; }
.pv-proy { display: flex; align-items: baseline; gap: 0.5rem; font-family: var(--font); font-size: 12px; }
.pv-arrow { color: var(--blue); font-weight: 700; }
.pv-proy-nombre { color: var(--blue); font-weight: 600; white-space: nowrap; }
.pv-proy-desc { color: var(--muted); }
.pv-abierto { display: flex; flex-direction: column; gap: 3px; }
.pv-abierto-item { font-family: var(--font); font-size: 12px; color: var(--text); }
.pv-abierto-item::before { content: '· '; color: var(--accent); }

/* Experiencia */
.pv-exp { display: flex; flex-direction: column; gap: 0.75rem; }
.pv-exp-meta { display: flex; align-items: center; gap: 0.625rem; }
.pv-año { font-family: var(--font); font-size: 11px; font-weight: 700; color: var(--blue); background: #deebff; padding: 1px 6px; }
.pv-empresa { font-family: var(--font); font-size: 13px; font-weight: 700; color: var(--text); }
.pv-cargo { font-family: var(--font); font-size: 12px; color: var(--accent); font-weight: 500; margin: 0; }

/* Proyecto */
.pv-proyecto { display: flex; flex-direction: column; gap: 0; }
.pv-img-wrap { border-bottom: 1px solid var(--border); overflow: hidden; max-height: 180px; }
.pv-img { width: 100%; height: 180px; object-fit: cover; object-position: top; display: block; }
.pv-proyecto-info { padding: 12px 0 0; display: flex; flex-direction: column; gap: 0.625rem; }
.pv-proy-titulo { font-family: var(--font); font-size: 1rem; font-weight: 700; color: var(--text); margin: 0; }

/* Habilidades */
.pv-hab { display: flex; flex-direction: column; }
.pv-hab-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
.pv-hab-cat { background: var(--bg); padding: 10px; }
.pv-hab-nombre { font-family: var(--font); font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 0.5rem; }
.pv-hab-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
.pv-hab-list li { font-family: var(--font); font-size: 11.5px; color: #42526e; padding-left: 10px; border-left: 2px solid #ebecf0; }

/* Certificaciones */
.pv-certs { display: flex; flex-direction: column; }
.pv-cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); }
.pv-cert-item { background: var(--bg); padding: 8px 10px; }
.pv-cert-titulo { font-family: var(--font); font-size: 11.5px; font-weight: 600; color: var(--text); margin: 0 0 4px; line-height: 1.4; }
.pv-cert-meta { font-family: var(--font); font-size: 10.5px; color: var(--muted); margin: 0; display: flex; justify-content: space-between; gap: 0.5rem; }
.pv-fecha { color: var(--blue); font-family: var(--font); font-size: 10px; }

/* Contacto */
.pv-contacto { display: flex; flex-direction: column; gap: 0; }
.pv-campo { display: flex; align-items: baseline; gap: 1rem; padding: 8px 0; border-bottom: 1px solid #f4f5f7; }
.pv-clave { font-family: var(--font); font-size: 10px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; min-width: 70px; }
.pv-val { font-family: var(--font); font-size: 12.5px; color: var(--text); }
.pv-link { color: var(--blue); text-decoration: none; }
.pv-link:hover { text-decoration: underline; }

/* ── Responsive ──────────────────────────────────────────────────────────────── */

@media (max-width: 767px) {
  .editor-pane { flex-direction: column; padding-top: 32px; }

  .vista-tabs { display: flex; }

  .panel { width: 100% !important; flex: 1; }

  .panel-oculto-movil { display: none; }

  .divisor-h { display: none; }
}
</style>
