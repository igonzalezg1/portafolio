<script setup lang="ts">
import { ref } from 'vue'

interface ContactInfo {
  icon: string
  label: string
  value: string
  link: string
}

const handleContactClick = (contact: ContactInfo) => {
  window.open(contact.link, contact.icon === 'linkedin' ? '_blank' : '_self')
}
</script>

<template>
  <footer
    class="w-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white py-16 px-6"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Título principal -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Trabajemos juntos</h2>
        <p class="text-lg text-gray-400">
          Disponible para proyectos freelance y oportunidades full-time
        </p>
      </div>

      <!-- Tarjetas de contacto -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <!-- Email Card -->
        <a
          href="mailto:gonzalezgarciaivandejesus@gmail.com"
          class="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer group"
        >
          <div class="flex flex-col items-center text-center">
            <!-- Icono Email -->
            <div class="mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-gray-400 text-sm mb-2">Email</h3>
            <p class="text-white font-medium text-sm break-all">
              gonzalezgarciaivandejesus@gmail.com
            </p>
          </div>
        </a>

        <!-- LinkedIn Card -->
        <a
          href="https://www.linkedin.com/in/gonzalezivan2000"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer group"
        >
          <div class="flex flex-col items-center text-center">
            <!-- Icono LinkedIn -->
            <div class="mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </div>
            <h3 class="text-gray-400 text-sm mb-2">LinkedIn</h3>
            <p class="text-white font-medium">gonzalezivan2000</p>
          </div>
        </a>

        <!-- Phone Card -->
        <a
          href="tel:+527291097554"
          class="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer group"
        >
          <div class="flex flex-col items-center text-center">
            <!-- Icono Phone -->
            <div class="mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 class="text-gray-400 text-sm mb-2">Teléfono</h3>
            <p class="text-white font-medium">+52 729-109-7554</p>
          </div>
        </a>
      </div>

      <!-- Copyright -->
      <div class="text-center pt-8 border-t border-slate-800">
        <p class="text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} Iván González García — Desarrollador Full-Stack
        </p>
        <p class="text-gray-500 text-xs mt-2">Ciudad de México, México</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Animaciones adicionales */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.group:hover svg {
  animation: float 2s ease-in-out infinite;
}
</style>
