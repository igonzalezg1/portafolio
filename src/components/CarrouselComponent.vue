<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import visaElectronica from '@/assets/img/visaelectronica.png'
import sellerCenter from '@/assets/img/sellercenter.png'
import sipf from '@/assets/img/sipf.png'
import sumapp from '@/assets/img/sumapp.png'

interface Project {
  id: number
  name: string
  image: string
  description: string
}

const projects = ref<Project[]>([
  {
    id: 4,
    name: 'Visa Electrónica',
    image: visaElectronica,
    description: 'Sistema de visado electrónico SRE',
  },
  {
    id: 2,
    name: 'SIPF',
    image: sipf,
    description: 'Sistema Penitenciario Federal',
  },
  {
    id: 1,
    name: 'Seller Center',
    image: sellerCenter,
    description: 'Plataforma de gestión para vendedores',
  },
  {
    id: 3,
    name: 'Sumapp',
    image: sumapp,
    description: 'Aplicación de gestión empresarial',
  },
])

const currentIndex = ref(0)
let intervalId: number | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.value.length
}

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? projects.value.length - 1 : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  intervalId = window.setInterval(() => {
    nextSlide()
  }, 4000)
}

const stopAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section class="carousel-section">
    <div class="carousel-header">
      <h2 class="section-heading">Proyectos creados</h2>
      <p class="carousel-subtitle">
        Algunos de los proyectos más destacados en los que he trabajado en las últimas empresas donde
        he estado (algunos desarrollados por mí desde 0).
      </p>
    </div>

    <div
      class="carousel-wrapper"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <!-- Slides Container -->
      <div class="carousel-track-outer">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div v-for="project in projects" :key="project.id" class="carousel-slide">
            <div class="slide-img-wrapper">
              <img :src="project.image" :alt="project.name" class="slide-img" />
            </div>
            <div class="slide-info">
              <span class="slide-index"
                >{{ projects.indexOf(project) + 1 }} / {{ projects.length }}</span
              >
              <h3 class="slide-name">{{ project.name }}</h3>
              <p class="slide-desc">{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de navegación -->
      <button @click="prevSlide" class="nav-btn nav-btn--prev" aria-label="Anterior">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="nav-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button @click="nextSlide" class="nav-btn nav-btn--next" aria-label="Siguiente">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="nav-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Indicadores -->
    <div class="carousel-indicators">
      <button
        v-for="(project, index) in projects"
        :key="index"
        @click="goToSlide(index)"
        :class="['indicator', currentIndex === index ? 'indicator--active' : '']"
        :aria-label="`Ir al proyecto ${index + 1}`"
      />
    </div>
  </section>
</template>

<style scoped>
.carousel-section {
  padding: 2rem 0 2.5rem;
}

.carousel-header {
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #dde1e6;
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.section-heading {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #0052cc;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.carousel-subtitle {
  font-size: 0.8125rem;
  color: #6b778c;
  margin: 0;
  max-width: 60ch;
}

.carousel-wrapper {
  position: relative;
  border: 1px solid #dde1e6;
  background: #ffffff;
}

.carousel-track-outer {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 4rem;
  gap: 1rem;
}

.slide-img-wrapper {
  width: 100%;
  max-width: 720px;
  border: 1px solid #dde1e6;
  overflow: hidden;
}

.slide-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.slide-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.slide-index {
  font-size: 0.6875rem;
  font-family: 'Courier New', monospace;
  color: #6b778c;
  letter-spacing: 0.05em;
}

.slide-name {
  font-size: 1rem;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
}

.slide-desc {
  font-size: 0.8125rem;
  color: #42526e;
  margin: 0;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #dde1e6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  z-index: 10;
}

.nav-btn:hover {
  background: #f4f5f7;
  border-color: #b3b9c4;
}

.nav-btn--prev {
  left: 12px;
}

.nav-btn--next {
  right: 12px;
}

.nav-icon {
  width: 16px;
  height: 16px;
  color: #172b4d;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.375rem;
  margin-top: 0.875rem;
}

.indicator {
  width: 24px;
  height: 3px;
  background: #dde1e6;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  padding: 0;
}

.indicator--active {
  background: #0052cc;
  width: 40px;
}

.indicator:hover:not(.indicator--active) {
  background: #b3b9c4;
}
</style>
