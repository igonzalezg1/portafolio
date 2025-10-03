<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
    image: '/src/assets/img/visaelectronica.png',
    description: 'Sistema de visado electrónico SRE',
  },
  {
    id: 2,
    name: 'SIPF',
    image: '/src/assets/img/sipf.png',
    description: 'Sistema Penitenciario Federal',
  },
  {
    id: 1,
    name: 'Seller Center',
    image: '/src/assets/img/sellercenter.png',
    description: 'Plataforma de gestión para vendedores',
  },
  {
    id: 3,
    name: 'Sumapp',
    image: '/src/assets/img/sumapp.png',
    description: 'Aplicación de gestión empresarial',
  },
])

const currentIndex = ref(0)
let intervalId: number | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.value.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? projects.value.length - 1 : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
  console.log(`Proyecto seleccionado: ${projects.value[index]?.name}`)
}

const startAutoplay = () => {
  intervalId = window.setInterval(() => {
    nextSlide()
  }, 4000) // Cambia cada 4 segundos
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
  <section
    class="w-full flex flex-col items-center justify-center py-16 bg-white/50 shadow-md rounded-xl p-8 mb-8"
  >
    <!-- Título centrado -->
    <h2 class="text-3xl font-bold mb-6 text-center">Proyectos creados</h2>
    <p class="text-gray-600 text-center mb-12 max-w-2xl">
      Aquí puedes ver algunos de los proyectos más destacados en los que he trabajado en las últimas
      empresas donde he estado (algunos desarrollados por mi desde 0).
    </p>

    <!-- Carrusel -->
    <div
      class="relative w-full max-w-5xl mx-auto"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <!-- Slides Container -->
      <div class="relative overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
        <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="project in projects"
            :key="project.id"
            class="min-w-full flex flex-col items-center justify-center p-8 md:p-12"
          >
            <!-- Imagen -->
            <div class="w-full max-w-3xl mb-6 rounded-xl overflow-hidden shadow-2xl">
              <img
                :src="project.image"
                :alt="project.name"
                class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <!-- Info del proyecto -->
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ project.name }}
              </h3>
              <p class="text-gray-600">
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de navegación -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
        aria-label="Anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
        aria-label="Siguiente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Indicadores (dots) -->
      <div class="flex justify-center gap-2 mt-8">
        <button
          v-for="(project, index) in projects"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'transition-all duration-300 rounded-full',
            currentIndex === index
              ? 'w-12 h-3 bg-blue-500'
              : 'w-3 h-3 bg-gray-300 hover:bg-gray-400',
          ]"
          :aria-label="`Ir al proyecto ${index + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animación suave para las imágenes */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>
