<script setup lang="ts">
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <section
    class="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-12 md:py-16 bg-white/70 shadow-md rounded-xl p-6 md:p-8 lg:p-12 mb-8"
  >
    <!-- Icono centrado arriba -->
    <div class="flex justify-center mb-4">
      <font-awesome-icon :icon="faTrophy" class="text-4xl text-yellow-500" />
    </div>

    <!-- Título centrado -->
    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">
      Estudios y Certificaciones
    </h2>

    <!-- Lista en 2 columnas en desktop, 1 columna en mobile -->
    <ul class="w-full max-w-6xl columns-1 lg:columns-2 gap-8 space-y-4">
      <li
        class="mb-6 break-inside-avoid bg-white/50 p-4 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg md:text-xl font-semibold text-gray-900">
          Ingeniería en Tecnologías de la Información
        </h3>
        <p class="text-gray-600 mt-2">Jul 2022</p>
        <p class="text-gray-500">Instituto Tecnológico de Toluca</p>
      </li>

      <li
        class="mb-6 break-inside-avoid bg-white/50 p-4 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg md:text-xl font-semibold text-gray-900">Técnico en Informática</h3>
        <p class="text-gray-600 mt-2">Jul 2017</p>
        <p class="text-gray-500">CBT No. 3 Toluca</p>
      </li>

      <li
        class="mb-6 break-inside-avoid bg-white/50 p-4 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg md:text-xl font-semibold text-gray-900">
          Construye Microservicios Docker, Kubernetes, Spring Boot, Spring Cloud, LoadBalancer,
          Security JWT, Amazon AWS ECS y EKS
        </h3>
        <p class="text-gray-600 mt-2">Enero 2025</p>
        <p class="text-gray-500">Udemy</p>
      </li>

      <li
        class="mb-6 break-inside-avoid bg-white/50 p-4 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg md:text-xl font-semibold text-gray-900">
          Alternativas modernas para la Arquitectura de Software. Domain Driven Design, CQRS,
          Eventos, Microservicios y mucho más!
        </h3>
        <p class="text-gray-600 mt-2">Marzo 2025</p>
        <p class="text-gray-500">Udemy</p>
      </li>

      <li
        class="mb-6 break-inside-avoid bg-white/50 p-4 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg md:text-xl font-semibold text-gray-900">
          Aprende Tailwind CSS desde cero: Utilidades básicas, diseño avanzado y personalización
          completa
        </h3>
        <p class="text-gray-600 mt-2">Junio 2023</p>
        <p class="text-gray-500">Udemy</p>
      </li>

      <li
        class="mb-6 break-inside-avoid bg-white/50 p-4 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg md:text-xl font-semibold text-gray-900">
          Aprende Vue 3, Vue-CLI, Bindings, API, Router, Vuex, Componentes, Formularios, Composition
          API
        </h3>
        <p class="text-gray-600 mt-2">Julio 2023</p>
        <p class="text-gray-500">Udemy</p>
      </li>

      <li
        class="mb-6 break-inside-avoid bg-white/50 p-4 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg md:text-xl font-semibold text-gray-900">
          El mejor curso Java con aplicaciones del mundo real (Escritorio, Web y Full Stack) Spring,
          Hibernate, JakartaEE, ChatGPT
        </h3>
        <p class="text-gray-600 mt-2">Agosto 2025</p>
        <p class="text-gray-500">Udemy</p>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
