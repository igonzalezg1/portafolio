<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{ listo: [] }>()

const lineasMostradas = ref<string[]>([])
const progreso = ref(0)
const terminado = ref(false)
const saliendo = ref(false)

const mensajes = [
  '> iniciando portfolio_cli v2.0...',
  '> cargando módulos de Vue 3...',
  '> montando árbol de archivos...',
  '> compilando experiencia laboral...',
  '> cargando proyectos destacados...',
  '> preparando terminal interactiva...',
  '> optimizando interfaz...',
]

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

async function typeLinea(linea: string) {
  let buf = ''
  const idx = lineasMostradas.value.push('') - 1
  for (const ch of linea) {
    buf += ch
    lineasMostradas.value[idx] = buf
    await sleep(22)
  }
}

onMounted(async () => {
  await sleep(200)
  for (let i = 0; i < mensajes.length; i++) {
    await typeLinea(mensajes[i]!)
    progreso.value = Math.round(((i + 1) / mensajes.length) * 100)
    await sleep(160)
  }
  await sleep(300)
  terminado.value = true
  await sleep(400)
  await typeLinea('> sistema listo.')
  await sleep(200)
  await typeLinea('> bienvenido, igonzalez.')
  await sleep(200)
  await typeLinea('> abriendo editor de código...')
  await sleep(700)
  saliendo.value = true
  await sleep(500)
  emit('listo')
})
</script>

<template>
  <div :class="['pantalla-carga', { saliendo }]">
    <div class="carga-inner">
      <!-- Header ASCII -->
      <pre class="ascii-header">
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝</pre>

      <p class="subtitulo">portfolio_cli v2.0  —  igonzalez</p>
      <div class="separador">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

      <!-- Mensajes -->
      <div class="mensajes">
        <div v-for="(linea, i) in lineasMostradas" :key="i" class="linea">
          {{ linea }}<span v-if="i === lineasMostradas.length - 1 && !terminado" class="cursor">█</span>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div v-if="progreso > 0" class="progreso-wrap">
        <div class="barra">
          <div class="barra-fill" :style="{ width: progreso + '%' }"></div>
        </div>
        <span class="pct">{{ progreso }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pantalla-carga {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #0c1008;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Menlo', 'Monaco', 'Cascadia Code', 'Courier New', monospace;
  transition: opacity 0.5s ease;
}

.pantalla-carga.saliendo {
  opacity: 0;
  pointer-events: none;
}

.carga-inner {
  width: min(680px, 90vw);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ascii-header {
  color: #3a8a3e;
  font-size: clamp(3.5px, 1vw, 7.5px);
  line-height: 1.2;
  white-space: pre;
  margin: 0;
  text-shadow: 0 0 8px #3a8a3e44;
}

.subtitulo {
  color: #57e863;
  font-size: 12px;
  margin: 0;
}

.separador {
  color: #2e5c34;
  font-size: 11px;
}

.mensajes {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-height: 140px;
}

.linea {
  color: #57e863;
  font-size: 12px;
  line-height: 1.5;
}

.cursor {
  animation: parpadeo 0.8s step-end infinite;
  color: #57e863;
}

@keyframes parpadeo {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.progreso-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.barra {
  flex: 1;
  height: 6px;
  background: #1a2e1a;
  border: 1px solid #2e5c34;
}

.barra-fill {
  height: 100%;
  background: #57e863;
  transition: width 0.2s ease;
  box-shadow: 0 0 6px #57e86366;
}

.pct {
  color: #57e863;
  font-size: 11px;
  width: 36px;
  text-align: right;
}

@media (max-width: 480px) {
  .ascii-header { display: none; }
  .subtitulo { font-size: 14px; color: #57e863; }
}
</style>
