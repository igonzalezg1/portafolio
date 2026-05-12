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
      <span class="vt-titulo-txt">~/portfolio</span>
      <div class="vt-titulo-der">
        <button class="vt-sidebar-btn" @click="sidebarVisible = !sidebarVisible" :title="sidebarVisible ? 'Ocultar explorador' : 'Mostrar explorador'">
          ☰
        </button>
      </div>
    </div>

    <!-- Tabs de archivos -->
    <div class="vt-tabs" v-if="tabsAbiertos.length">
      <div
        v-for="tab in tabsAbiertos"
        :key="tab"
        :class="['vt-tab', { 'vt-tab--activo': tab === tabActivo }]"
        @click="tabActivo = tab"
      >
        <span class="tab-icono">V</span>
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
              {{ iconoArchivo(item.nodo) }}
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
/* ── Variables ────────────────────────────────────────────────────────────── */
.vt-ventana {
  --bg:        #f5f2ec;
  --bg-sb:     #ede9e1;
  --bg-tab:    #e8e4dc;
  --bg-activo: #f5f2ec;
  --bg-hover:  #e4e0d8;
  --bg-sel:    #dbd6cc;
  --border:    #cfc9c0;
  --text:      #2a2420;
  --muted:     #7a7060;
  --accent:    #9b2335;
  --blue:      #1c4f7a;
  --est-bg:    #2a2420;
  --est-txt:   #b0a898;
  --font:      'Menlo', 'Monaco', 'Cascadia Code', 'Courier New', monospace;

  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg);
  font-family: var(--font);
  font-size: 13px;
  color: var(--text);
  overflow: hidden;
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
}

.vt-semaforos { display: flex; gap: 6px; align-items: center; }
.sl { width: 12px; height: 12px; border-radius: 50%; display: block; }
.sl-r { background: #ff5f56; }
.sl-y { background: #ffbd2e; }
.sl-g { background: #27c93f; }

.vt-titulo-txt { flex: 1; text-align: center; font-size: 12px; color: var(--muted); font-weight: 500; }
.vt-titulo-der { display: flex; align-items: center; gap: 0.5rem; }

.vt-sidebar-btn {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 14px;
  padding: 2px 6px;
  transition: color 0.15s;
}
.vt-sidebar-btn:hover { color: var(--text); }

/* ── Tabs ────────────────────────────────────────────────────────────────── */
.vt-tabs {
  display: flex;
  background: var(--bg-sb);
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
  min-height: 34px;
  align-items: stretch;
  flex-shrink: 0;
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
  border-bottom: 1px solid var(--bg-activo);
  margin-bottom: -1px;
}

.tab-icono { font-size: 10px; color: #41b883; font-weight: 700; }
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

.ft-icono { font-size: 9px; color: var(--muted); width: 14px; text-align: center; flex-shrink: 0; }
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
  background: var(--est-bg);
  padding: 0 8px;
  color: var(--est-txt);
  font-size: 11px;
  flex-shrink: 0;
}

.est-izq, .est-der { display: flex; align-items: center; gap: 12px; }
.est-chip { opacity: 0.75; white-space: nowrap; }
.est-rama { color: #6ca8e0; opacity: 1; }

.est-terminal-btn {
  background: none;
  border: none;
  color: var(--est-txt);
  cursor: pointer;
  font-family: var(--font);
  font-size: 11px;
  padding: 0;
  opacity: 0.75;
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
  .vt-sidebar { width: 0; min-width: 0; border-right: none; }
  .vt-sidebar--oculto { width: 0; min-width: 0; }
  /* En móvil el botón ☰ abre el sidebar como overlay */
  .vt-ventana .vt-sidebar:not(.vt-sidebar--oculto) {
    width: 200px;
    min-width: 200px;
    position: absolute;
    top: 32px;
    left: 0;
    bottom: 24px;
    z-index: 20;
    box-shadow: 2px 0 8px rgba(0,0,0,0.15);
  }
  .est-chip:not(.est-rama):not(.est-terminal-btn) { display: none; }
}
</style>
