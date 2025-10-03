<script setup lang="ts">
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <section
    class="w-full flex flex-col items-center justify-center py-16 bg-white/50 shadow-md rounded-xl p-8 mb-8"
  >
    <!-- Icono centrado arriba -->
    <div class="flex justify-center mb-4">
      <font-awesome-icon :icon="faTrophy" class="text-4xl text-yellow-500" />
    </div>

    <!-- Título centrado -->
    <h2 class="text-3xl font-bold mb-6 text-center">Estudios y Certificaciones</h2>

    <!-- Lista en 2 columnas en desktop, 1 columna en mobile -->
    <ul class="w-full max-w-5xl columns-1 md:columns-2 gap-8">
      <li class="mb-4 break-inside-avoid">
        <h3 class="text-xl font-semibold">Ingeniería en Tecnologías de la Información</h3>
        <p class="text-gray-600">Jul 2022</p>
        <p class="text-gray-500">Instituto Tecnológico de Toluca</p>
      </li>
      <li class="mb-4 break-inside-avoid">
        <h3 class="text-xl font-semibold">Técnico en Informática</h3>
        <p class="text-gray-600">Jul 2017</p>
        <p class="text-gray-500">CBT No. 3 Toluca</p>
      </li>
      <li class="mb-4 break-inside-avoid">
        <h3 class="text-xl font-semibold">
          Construye Microservicios Docker, Kubernetes, Spring Boot, Spring Cloud, LoadBalancer,
          Security JWT, Amazon AWS ECS y EKS
        </h3>
        <p class="text-gray-600">Enero 2025</p>
        <p class="text-gray-500">Udemy</p>
      </li>
      <li class="mb-4 break-inside-avoid">
        <h3 class="text-xl font-semibold">
          Alternativas modernas para la Arquitectura de Software. Domain Driven Design, CQRS,
          Eventos, Microservicios y mucho más!
        </h3>
        <p class="text-gray-600">Marzo 2025</p>
        <p class="text-gray-500">Udemy</p>
      </li>
      <li class="mb-4 break-inside-avoid">
        <h3 class="text-xl font-semibold">
          Aprende Tailwind CSS desde cero: Utilidades básicas, diseño avanzado y personalización
          completa
        </h3>
        <p class="text-gray-600">Junio 2023</p>
        <p class="text-gray-500">Udemy</p>
      </li>
      <li class="mb-4 break-inside-avoid">
        <h3 class="text-xl font-semibold">
          Aprende Vue 3, Vue-CLI, Bindings, API, Router, Vuex, Componentes, Formularios, Composition
          API
        </h3>
        <p class="text-gray-600">Julio 2023</p>
        <p class="text-gray-500">Udemy</p>
      </li>
      <li class="mb-4 break-inside-avoid">
        <h3 class="text-xl font-semibold">
          El mejor curso Java con aplicaciones del mundo real (Escritorio, Web y Full Stack) Spring,
          Hibernate, JakartaEE, ChatGPT
        </h3>
        <p class="text-gray-600">Agosto 2025</p>
        <p class="text-gray-500">Udemy</p>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
