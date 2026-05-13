<script setup lang="ts">
import { ref, computed } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import EditorPane from './components/EditorPane.vue'
import TerminalPane from './components/TerminalPane.vue'
import { archivoTree, archivos } from './data/files'
import type { FileNode } from './data/files'

// ─── Estado global ────────────────────────────────────────────────────────────

const cargando = ref(true)
const tabsAbiertos = ref<string[]>(['inicio.vue'])
const tabActivo = ref('inicio.vue')
const terminalAbierta = ref(true)
const alturaTerminal = ref(220)
const dirsExpandidos = ref<Set<string>>(new Set(['experiencia', 'proyectos']))
const sidebarVisible = ref(true)

// ─── Datos del archivo activo ─────────────────────────────────────────────────

const datosActivos = computed(() => archivos[tabActivo.value])

// ─── Acciones ─────────────────────────────────────────────────────────────────

function abrirArchivo(ruta: string) {
  if (!tabsAbiertos.value.includes(ruta)) tabsAbiertos.value.push(ruta)
  tabActivo.value = ruta
  if (window.innerWidth < 768) sidebarVisible.value = false
}

function cerrarTab(ruta: string) {
  const idx = tabsAbiertos.value.indexOf(ruta)
  tabsAbiertos.value.splice(idx, 1)
  if (tabActivo.value === ruta) {
    tabActivo.value = tabsAbiertos.value[Math.max(0, idx - 1)] ?? ''
  }
}

function toggleDir(ruta: string) {
  if (dirsExpandidos.value.has(ruta)) dirsExpandidos.value.delete(ruta)
  else dirsExpandidos.value.add(ruta)
}

// ─── Árbol aplanado ───────────────────────────────────────────────────────────

const arbolPlano = computed(() => {
  const resultado: Array<{ nodo: FileNode; profundidad: number }> = []
  function recorrer(nodos: FileNode[], prof: number) {
    for (const nodo of nodos) {
      resultado.push({ nodo, profundidad: prof })
      if (nodo.type === 'dir' && dirsExpandidos.value.has(nodo.path) && nodo.children) {
        recorrer(nodo.children, prof + 1)
      }
    }
  }
  recorrer(archivoTree, 0)
  return resultado
})

function iconoArchivo(nodo: FileNode): string {
  if (nodo.type === 'dir') return dirsExpandidos.value.has(nodo.path) ? '▾' : '▸'
  return 'V'
}

function nombreTab(ruta: string): string {
  return ruta.split('/').pop() ?? ruta
}
</script>

<template>
  <!-- ── Pantalla de carga ────────────────────────────────────────────────── -->
  <LoadingScreen v-if="cargando" @listo="cargando = false" />

  <!-- ── Editor ──────────────────────────────────────────────────────────── -->
  <div v-else class="vt-ventana">

    <!-- Barra de título -->
    <div class="vt-titulo">
      <div class="vt-semaforos">
        <span class="sl sl-r"></span>
        <span class="sl sl-y"></span>
        <span class="sl sl-g"></span>
      </div>
      <span class="vt-titulo-txt">~/portfolio — Ivan González García</span>
    </div>

    <!-- Cuerpo: activity bar + área de trabajo -->
    <div class="vt-cuerpo">

      <!-- Activity bar estilo VSCode -->
      <nav class="vt-activity-bar">
        <div class="act-top">
          <button
            class="act-btn"
            :class="{ 'act-btn--activo': sidebarVisible }"
            @click="sidebarVisible = !sidebarVisible"
            title="Explorador"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button class="act-btn" title="Buscar">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button class="act-btn" title="Control de versiones">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
              <path d="M6 21V9a9 9 0 0 0 9 9"/>
            </svg>
          </button>
          <button class="act-btn" title="Depuración">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
            </svg>
          </button>
          <button class="act-btn" title="Extensiones">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="9" height="9"/><rect x="13" y="2" width="9" height="9"/>
              <rect x="2" y="13" width="9" height="9"/><rect x="13" y="13" width="9" height="9"/>
            </svg>
          </button>
        </div>
        <div class="act-bottom">
          <button class="act-btn" title="Cuenta">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <button class="act-btn" title="Configuración">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </nav>

      <!-- Área de trabajo -->
      <div class="vt-area">

        <!-- Backdrop móvil para cerrar sidebar -->
        <transition name="t-fade">
          <div v-if="sidebarVisible" class="vt-backdrop" @click="sidebarVisible = false" />
        </transition>

        <!-- Tabs de archivos -->
        <div class="vt-tabs" v-if="tabsAbiertos.length">
          <div
            v-for="tab in tabsAbiertos"
            :key="tab"
            :class="['vt-tab', { 'vt-tab--activo': tab === tabActivo }]"
            @click="tabActivo = tab"
          >
            <span class="tab-icono">
              <svg viewBox="0 0 261.76 226.69" width="13" height="12" style="display:block">
                <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/>
                <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/>
              </svg>
            </span>
            <span class="tab-nombre">{{ nombreTab(tab) }}</span>
            <button class="tab-cerrar" @click.stop="cerrarTab(tab)" aria-label="Cerrar">×</button>
          </div>
        </div>

        <!-- Layout principal: sidebar + editor -->
        <div class="vt-principal">

          <!-- Sidebar explorador -->
          <aside class="vt-sidebar" :class="{ 'vt-sidebar--oculto': !sidebarVisible }">
            <div class="sb-seccion-label">EXPLORADOR</div>
            <div class="vt-arbol">
              <div
                v-for="item in arbolPlano"
                :key="item.nodo.path"
                :class="[
                  'ft-item',
                  item.nodo.type === 'dir' ? 'ft-dir' : 'ft-archivo',
                  { 'ft-activo': tabActivo === item.nodo.path },
                ]"
                :style="{ paddingLeft: `${item.profundidad * 14 + 8}px` }"
                @click="item.nodo.type === 'dir' ? toggleDir(item.nodo.path) : abrirArchivo(item.nodo.path)"
              >
                <span :class="['ft-icono', item.nodo.type === 'file' && 'ft-icono-vue']">
                  <svg v-if="item.nodo.type === 'file'" viewBox="0 0 261.76 226.69" width="11" height="10" style="display:block">
                    <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/>
                    <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/>
                  </svg>
                  <template v-else>{{ iconoArchivo(item.nodo) }}</template>
                </span>
                <span class="ft-nombre">{{ item.nodo.name }}</span>
              </div>
            </div>

            <div class="sb-fondo">
              <div class="sb-git-label">GIT ————</div>
              <div class="sb-git-info">rama: main · limpio</div>
            </div>
          </aside>

          <!-- Editor split -->
          <EditorPane
            v-if="datosActivos"
            :codigo="datosActivos.code"
            :preview-type="datosActivos.previewType"
            :preview-data="datosActivos.previewData"
            :archivo="tabActivo"
          />
          <div v-else class="vt-vacio">
            <span>Selecciona un archivo del explorador</span>
          </div>
        </div>

        <!-- Terminal -->
        <TerminalPane
          v-if="terminalAbierta"
          :archivos="archivos"
          :altura="alturaTerminal"
          @abrir-archivo="abrirArchivo"
          @redimensionar="alturaTerminal = $event"
        />

      </div>
    </div>

    <!-- Barra de estado -->
    <div class="vt-estado">
      <div class="est-izq">
        <span class="est-chip est-rama">⎇ main</span>
        <span class="est-chip">UTF-8</span>
        <span class="est-chip">LF</span>
      </div>
      <div class="est-der">
        <span class="est-chip">{{ tabActivo || '—' }}</span>
        <button class="est-chip est-terminal-btn" @click="terminalAbierta = !terminalAbierta">
          {{ terminalAbierta ? '⌃` ocultar terminal' : '⌃` mostrar terminal' }}
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Variables Tokyo Night Storm ─────────────────────────────────────────── */
.vt-ventana {
  --bg:        #24283b;
  --bg-sb:     #1f2335;
  --bg-act:    #1f2335;
  --bg-tab:    #1d2237;
  --bg-activo: #24283b;
  --bg-hover:  #2a2f45;
  --bg-sel:    #283457;
  --border:    #1a1b2e;
  --text:      #c0caf5;
  --muted:     #565f89;
  --accent:    #f7768e;
  --blue:      #7aa2f7;
  --green:     #9ece6a;
  --est-bg:    #1f2335;
  --est-txt:   #c0caf5;
  --font:      'Menlo', 'Monaco', 'Cascadia Code', 'Courier New', monospace;

  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg);
  font-family: var(--font);
  font-size: 13px;
  color: var(--text);
  overflow: hidden;
  overscroll-behavior: none;
}

/* ── Barra de título ─────────────────────────────────────────────────────── */
.vt-titulo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 32px;
  min-height: 32px;
  background: var(--bg-sb);
  border-bottom: 1px solid var(--border);
  padding: 0 12px;
  user-select: none;
  flex-shrink: 0;
}

.vt-semaforos { display: flex; gap: 6px; align-items: center; }
.sl { width: 12px; height: 12px; border-radius: 50%; display: block; }
.sl-r { background: #ff5f56; }
.sl-y { background: #ffbd2e; }
.sl-g { background: #27c93f; }

.vt-titulo-txt { flex: 1; text-align: center; font-size: 12px; color: var(--muted); font-weight: 500; }

/* ── Cuerpo (activity bar + area) ────────────────────────────────────────── */
.vt-cuerpo {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* ── Activity Bar ────────────────────────────────────────────────────────── */
.vt-activity-bar {
  width: 48px;
  min-width: 48px;
  background: var(--bg-act);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  flex-shrink: 0;
}

.act-top,
.act-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
  gap: 0;
}

.act-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-left: 2px solid transparent;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.15s;
  padding: 0;
  flex-shrink: 0;
  touch-action: none;
}

.act-btn:hover { color: var(--text); }
.act-btn--activo { color: var(--text); border-left-color: var(--text); }

/* ── Área de trabajo ─────────────────────────────────────────────────────── */
.vt-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-height: 0;
  position: relative;
}

/* Backdrop móvil — solo visible en pantallas pequeñas */
.vt-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 15;
}

@media (max-width: 767px) {
  .vt-backdrop { display: block; }
}

.t-fade-enter-active,
.t-fade-leave-active { transition: opacity 0.15s ease; }
.t-fade-enter-from,
.t-fade-leave-to { opacity: 0; }

/* ── Tabs ────────────────────────────────────────────────────────────────── */
.vt-tabs {
  display: flex;
  background: var(--bg-sb);
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
  min-height: 34px;
  align-items: stretch;
  flex-shrink: 0;
  touch-action: pan-x;
}

.vt-tab {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
  border-right: 1px solid var(--border);
  background: var(--bg-tab);
  color: var(--muted);
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  transition: background 0.1s;
  user-select: none;
}
.vt-tab:hover { background: var(--bg-hover); }
.vt-tab--activo {
  background: var(--bg-activo);
  color: var(--text);
  border-bottom: 1px solid var(--blue);
  margin-bottom: -1px;
}

.tab-icono { display: flex; align-items: center; }
.tab-nombre { max-width: 110px; overflow: hidden; text-overflow: ellipsis; }

.tab-cerrar {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  padding: 0 2px;
  font-size: 14px;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.1s;
}
.vt-tab:hover .tab-cerrar,
.vt-tab--activo .tab-cerrar { opacity: 1; }
.tab-cerrar:hover { color: var(--text); }

/* ── Layout principal ────────────────────────────────────────────────────── */
.vt-principal {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
.vt-sidebar {
  width: 210px;
  min-width: 210px;
  background: var(--bg-sb);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease, min-width 0.2s ease;
}

.vt-sidebar--oculto { width: 0; min-width: 0; border-right: none; }

.sb-seccion-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 8px 6px;
  border-bottom: 1px solid var(--border);
}

.vt-arbol { flex: 1; overflow-y: auto; padding: 4px 0; }

.ft-item {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  cursor: pointer;
  color: var(--muted);
  font-size: 12px;
  transition: background 0.1s, color 0.1s;
  white-space: nowrap;
  overflow: hidden;
}
.ft-item:hover { background: var(--bg-hover); color: var(--text); }
.ft-activo { background: var(--bg-sel) !important; color: var(--text) !important; }
.ft-dir { font-weight: 600; color: var(--text); }

.ft-icono { font-size: 9px; color: var(--muted); width: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ft-icono-vue { color: #41b883; font-weight: 700; font-size: 10px; }
.ft-nombre { overflow: hidden; text-overflow: ellipsis; }

.sb-fondo {
  padding: 8px;
  border-top: 1px solid var(--border);
  font-size: 10px;
  color: var(--muted);
}
.sb-git-label { font-weight: 700; letter-spacing: 0.05em; margin-bottom: 2px; }

/* Vacío */
.vt-vacio {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 12px;
}

/* ── Barra de estado ─────────────────────────────────────────────────────── */
.vt-estado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  min-height: 24px;
  background: var(--blue);
  padding: 0 8px;
  color: #ffffff;
  font-size: 11px;
  flex-shrink: 0;
}

.est-izq, .est-der { display: flex; align-items: center; gap: 12px; }
.est-chip { opacity: 0.9; white-space: nowrap; }
.est-rama { opacity: 1; }

.est-terminal-btn {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-family: var(--font);
  font-size: 11px;
  padding: 0;
  opacity: 0.9;
  transition: opacity 0.15s;
}
.est-terminal-btn:hover { opacity: 1; }

/* ── Scrollbars ──────────────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: var(--muted); }

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 767px) {
  .vt-sidebar {
    width: 0;
    min-width: 0;
    border-right: none;
  }

  .vt-sidebar--oculto {
    width: 0 !important;
    min-width: 0 !important;
  }

  .vt-sidebar:not(.vt-sidebar--oculto) {
    position: fixed;
    top: 32px;
    left: 48px;
    bottom: 24px;
    width: 220px !important;
    min-width: 220px !important;
    z-index: 20;
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.5);
    transition: none;
  }

  .est-chip:not(.est-rama):not(.est-terminal-btn) { display: none; }
}
</style>
