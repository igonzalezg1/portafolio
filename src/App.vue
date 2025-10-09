<script setup lang="ts">
import HomeComponent from './components/HomeComponent.vue'
import ContactsComponent from './components/ContactsComponent.vue'
import AbautComponent from './components/AbautComponent.vue'
import CertificationsComponent from './components/CertificationsComponent.vue'
import HabilitiesComponent from './components/HabilitiesComponent.vue'
import ExperienceComponent from './components/ExperienceComponent.vue'
import CarrouselComponent from './components/CarrouselComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { ref, onMounted, onUnmounted } from 'vue'

// Estado de visibilidad para cada sección
const sectionsVisible = ref({
  home: false,
  contacts: false,
  about: false,
  certifications: false,
  habilities: false,
  experience: false,
  carrousel: false,
})

// Estado para el efecto del mouse
const mousePosition = ref({ x: 0, y: 0 })
const cursorGlow = ref<HTMLElement | null>(null)

// Función para actualizar la posición del mouse
const handleMouseMove = (event: MouseEvent) => {
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY,
  }

  if (cursorGlow.value) {
    cursorGlow.value.style.transform = `translate(${event.clientX - 250}px, ${event.clientY - 250}px)`
  }
}

onMounted(() => {
  // Mostrar el home inmediatamente
  sectionsVisible.value.home = true

  // Configurar el Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-section')
          if (section && sectionsVisible.value.hasOwnProperty(section)) {
            sectionsVisible.value[section as keyof typeof sectionsVisible.value] = true
          }
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    },
  )

  // Observar todas las secciones
  document.querySelectorAll('[data-section]').forEach((section) => {
    observer.observe(section)
  })

  // Agregar listener para el mouse
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Fondo base con gradiente -->
    <div class="fixed inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 -z-20"></div>

    <!-- Patrón de puntos animado -->
    <div class="fixed inset-0 -z-20 opacity-30">
      <div class="absolute inset-0 dot-pattern"></div>
    </div>

    <!-- Ondas animadas de fondo -->
    <div class="fixed inset-0 -z-20 overflow-hidden">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>

    <!-- Partículas flotantes -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
      <div class="particle particle-5"></div>
      <div class="particle particle-6"></div>
    </div>

    <!-- Efecto de resplandor que sigue al mouse -->
    <div
      ref="cursorGlow"
      class="fixed w-[500px] h-[500px] pointer-events-none -z-10 transition-opacity duration-300"
      style="
        background: radial-gradient(
          circle,
          rgba(59, 130, 246, 0.15) 0%,
          rgba(147, 197, 253, 0.08) 25%,
          transparent 70%
        );
        filter: blur(40px);
        will-change: transform;
      "
    ></div>

    <!-- Efectos de resplandor adicionales fijos -->
    <div
      class="fixed top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse-slow"
    ></div>
    <div
      class="fixed bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -z-10 animate-pulse-slow"
      style="animation-delay: 1s"
    ></div>
    <div
      class="fixed top-1/2 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl -z-10 animate-pulse-slow"
      style="animation-delay: 2s"
    ></div>

    <section class="min-h-screen flex flex-col px-6 py-16 relative z-0">
      <div
        data-section="home"
        :class="[
          'transition-all duration-1000 ease-out',
          sectionsVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <HomeComponent />
      </div>
      <hr class="border-t border-gray-200 my-8" />

      <div
        data-section="contacts"
        :class="[
          'transition-all duration-1000 ease-out delay-100',
          sectionsVisible.contacts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <ContactsComponent />
      </div>

      <div
        data-section="about"
        :class="[
          'transition-all duration-1000 ease-out delay-150',
          sectionsVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10',
        ]"
      >
        <AbautComponent />
      </div>

      <div
        data-section="certifications"
        :class="[
          'transition-all duration-1000 ease-out delay-200',
          sectionsVisible.certifications ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
        ]"
      >
        <CertificationsComponent />
      </div>

      <div
        data-section="habilities"
        :class="[
          'transition-all duration-1000 ease-out delay-150',
          sectionsVisible.habilities ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        ]"
      >
        <HabilitiesComponent />
      </div>

      <div
        data-section="experience"
        :class="[
          'transition-all duration-1000 ease-out delay-200',
          sectionsVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <ExperienceComponent />
      </div>

      <div
        data-section="carrousel"
        :class="[
          'transition-all duration-1000 ease-out delay-100',
          sectionsVisible.carrousel
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-10',
        ]"
      >
        <CarrouselComponent />
      </div>
    </section>

    <div
      class="transition-all duration-1000 ease-out relative z-0"
      :class="sectionsVisible.carrousel ? 'opacity-100' : 'opacity-0'"
    >
      <FooterComponent />
    </div>
  </div>
</template>

<style scoped>
/* Animación de pulso lento */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Patrón de puntos */
.dot-pattern {
  background-image: radial-gradient(circle, #93c5fd 1px, transparent 1px);
  background-size: 30px 30px;
  animation: drift 60s linear infinite;
}

@keyframes drift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

/* Ondas de fondo */
.wave {
  position: absolute;
  width: 200%;
  height: 200%;
  border-radius: 40%;
  opacity: 0.1;
}

.wave-1 {
  background: linear-gradient(135deg, transparent 40%, #3b82f6 50%, transparent 60%);
  animation: wave-animation 25s ease-in-out infinite;
  top: -50%;
  left: -50%;
}

.wave-2 {
  background: linear-gradient(135deg, transparent 40%, #8b5cf6 50%, transparent 60%);
  animation: wave-animation 30s ease-in-out infinite reverse;
  top: -50%;
  right: -50%;
  animation-delay: -5s;
}

.wave-3 {
  background: linear-gradient(135deg, transparent 40%, #06b6d4 50%, transparent 60%);
  animation: wave-animation 35s ease-in-out infinite;
  bottom: -50%;
  left: -25%;
  animation-delay: -10s;
}

@keyframes wave-animation {
  0%,
  100% {
    transform: rotate(0deg) translate(0, 0);
  }
  25% {
    transform: rotate(90deg) translate(20px, 20px);
  }
  50% {
    transform: rotate(180deg) translate(0, 0);
  }
  75% {
    transform: rotate(270deg) translate(-20px, -20px);
  }
}

/* Partículas flotantes */
.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
  border-radius: 50%;
  filter: blur(2px);
}

.particle-1 {
  width: 4px;
  height: 4px;
  top: 20%;
  left: 10%;
  animation: float 20s ease-in-out infinite;
}

.particle-2 {
  width: 6px;
  height: 6px;
  top: 60%;
  left: 80%;
  animation: float 25s ease-in-out infinite;
  animation-delay: -5s;
}

.particle-3 {
  width: 3px;
  height: 3px;
  top: 40%;
  left: 50%;
  animation: float 30s ease-in-out infinite;
  animation-delay: -10s;
}

.particle-4 {
  width: 5px;
  height: 5px;
  top: 80%;
  left: 20%;
  animation: float 22s ease-in-out infinite;
  animation-delay: -15s;
}

.particle-5 {
  width: 4px;
  height: 4px;
  top: 10%;
  left: 70%;
  animation: float 28s ease-in-out infinite;
  animation-delay: -8s;
}

.particle-6 {
  width: 3px;
  height: 3px;
  top: 50%;
  left: 90%;
  animation: float 24s ease-in-out infinite;
  animation-delay: -12s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(100px, -50px) scale(1.2);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50px, -100px) scale(0.8);
    opacity: 0.4;
  }
  75% {
    transform: translate(-100px, 50px) scale(1.1);
    opacity: 0.5;
  }
}
</style>
