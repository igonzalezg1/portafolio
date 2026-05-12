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
  <div class="home-layout">
    <!-- Texto -->
    <div class="home-text">
      <div class="role-label">
        <span class="role-line"></span>
        <span class="role-text">Full-Stack Developer</span>
      </div>

      <h1 class="home-title">Iván González</h1>

      <p class="home-subtitle">
        Construyo experiencias web escalables y de alto rendimiento con 4+ años de experiencia
      </p>

      <!-- Stats -->
      <div class="stats-row">
        <div v-for="(stat, index) in stats" :key="index" class="stat-item">
          <div class="stat-value">{{ animatedStats[index] }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="cta-row">
        <button @click="handleContactClick" class="btn-primary">Contáctame</button>
        <button @click="handleEmailClick" class="btn-secondary">Email</button>
      </div>
    </div>

    <!-- Imagen -->
    <div class="home-avatar">
      <img :src="Principal" alt="Iván González" class="avatar-img" />
    </div>
  </div>
</template>

<style scoped>
.home-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem 0 2rem;
}

@media (min-width: 768px) {
  .home-layout {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 3rem;
  }
}

.home-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}

.role-label {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.role-line {
  display: block;
  width: 2rem;
  height: 2px;
  background: #0052cc;
}

.role-text {
  font-size: 0.6875rem;
  font-family: 'Courier New', monospace;
  color: #6b778c;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.home-title {
  font-size: clamp(2.25rem, 5.5vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #172b4d;
  line-height: 1;
  margin: 0;
}

.home-subtitle {
  font-size: 1rem;
  color: #42526e;
  max-width: 40rem;
  line-height: 1.65;
  margin: 0;
}

.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-top: 0.5rem;
  border-top: 1px solid #dde1e6;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #0052cc;
  line-height: 1.1;
  font-family: 'Courier New', monospace;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b778c;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn-primary {
  padding: 0.5rem 1.25rem;
  background: #0052cc;
  color: #ffffff;
  border: 1px solid #0052cc;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: 2px;
  letter-spacing: 0.01em;
}

.btn-primary:hover {
  background: #0747a6;
  border-color: #0747a6;
}

.btn-secondary {
  padding: 0.5rem 1.25rem;
  background: transparent;
  color: #0052cc;
  border: 1px solid #0052cc;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: 2px;
  letter-spacing: 0.01em;
}

.btn-secondary:hover {
  background: #deebff;
}

.home-avatar {
  flex-shrink: 0;
}

.avatar-img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border: 1px solid #dde1e6;
  display: block;
}

@media (min-width: 768px) {
  .avatar-img {
    width: 180px;
    height: 180px;
  }
}
</style>
