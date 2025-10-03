<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Principal from '@/assets/img/principal.jpg'

interface Stat {
  value: string
  label: string
}

const stats = ref<Stat[]>([
  { value: '4+', label: 'Años Experiencia' },
  { value: '10+', label: 'Proyectos comprobables' },
  { value: '10+', label: 'Tecnologías' },
])

const animatedStats = ref<string[]>(['0', '0', '0'])

const animateNumbers = () => {
  stats.value.forEach((stat, index) => {
    const target = parseInt(stat.value)
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        animatedStats.value[index] = stat.value
        clearInterval(timer)
      } else {
        animatedStats.value[index] = Math.floor(current) + '+'
      }
    }, duration / steps)
  })
}

onMounted(() => animateNumbers())

const handleContactClick = () => {
  const contactSection = document.getElementById('contacto')
  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
}

const handleEmailClick = () => {
  window.location.href = 'mailto:gonzalezgarciaivandejesus@gmail.com'
}
</script>

<template>
  <div
    class="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8"
  >
    <!-- Texto -->
    <div class="flex-1 space-y-6 animate-fade-in">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-16 h-1 bg-blue-500 rounded-full" />
        <span class="text-sm font-mono text-gray-500 tracking-wider uppercase">
          Full-Stack Developer
        </span>
      </div>

      <h1 class="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 leading-none">
        Iván González
      </h1>

      <p class="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
        Construyo experiencias web escalables y de alto rendimiento con 4+ años de experiencia
      </p>

      <!-- Stats -->
      <div class="flex flex-wrap gap-12 pt-6">
        <div v-for="(stat, index) in stats" :key="index" class="group">
          <div
            class="text-4xl md:text-5xl font-bold text-blue-500 mb-1 transition-transform group-hover:scale-110"
          >
            {{ animatedStats[index] }}
          </div>
          <div class="text-sm md:text-base text-gray-600">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap gap-4 pt-8">
        <button
          @click="handleContactClick"
          class="group px-8 py-4 bg-gray-900 text-white rounded-full flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:shadow-2xl hover:scale-105 font-medium"
        >
          Contactame
        </button>

        <button
          @click="handleEmailClick"
          class="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium hover:scale-105"
        >
          Email
        </button>
      </div>
    </div>

    <!-- Imagen como avatar -->
    <div class="flex-shrink-0">
      <img
        :src="Principal"
        alt="Iván González"
        class="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover border-4 border-blue-500 shadow-lg"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
