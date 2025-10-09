<script setup lang="ts"></script>

<template>
  <section class="p-6 bg-white/50">
    <h2 class="text-5xl font-bold mb-8 text-center">Skills tecnológicos</h2>

    <!-- Cards principales (2 columnas desktop, 1 columna mobile) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Backend -->
      <div class="p-6 border border-gray-300 rounded-lg shadow-md bg-white flex flex-col">
        <div class="flex items-center gap-3 mb-2">
          <font-awesome-icon :icon="['fas', 'code']" class="text-blue-500 w-6 h-6" />
          <h3 class="text-xl font-semibold">Backend</h3>
        </div>
        <ul class="list-disc list-inside mb-4">
          <li>PHP/Laravel</li>
          <li>NodeJS</li>
          <li>Java/Spring Boot</li>
          <li>C#/.NET</li>
          <li>Golang</li>
        </ul>
        <!-- Tecnologías FontAwesome -->
        <div class="flex gap-4 text-gray-400 text-2xl mt-2 justify-center">
          <font-awesome-icon :icon="['fab', 'laravel']" />
          <font-awesome-icon :icon="['fab', 'node-js']" />
          <font-awesome-icon :icon="['fab', 'java']" />
        </div>
      </div>

      <!-- Frontend -->
      <div class="p-6 border border-gray-300 rounded-lg shadow-md bg-white flex flex-col">
        <div class="flex items-center gap-3 mb-2">
          <font-awesome-icon :icon="['fas', 'palette']" class="text-blue-500 w-6 h-6" />
          <h3 class="text-xl font-semibold">Frontend</h3>
        </div>
        <ul class="list-disc list-inside mb-4">
          <li>VueJS</li>
          <li>Angular</li>
          <li>React</li>
          <li>CSS/Tailwind/Bootstrap</li>
          <li>Figma</li>
          <li>UX/UI</li>
          <li>Quasar, Angular Material</li>
        </ul>
        <!-- Tecnologías FontAwesome -->
        <div class="flex gap-4 text-gray-400 text-2xl mt-2 justify-center">
          <font-awesome-icon :icon="['fab', 'vuejs']" />
          <font-awesome-icon :icon="['fab', 'angular']" />
          <font-awesome-icon :icon="['fab', 'react']" />
        </div>
      </div>

      <!-- Bases de datos -->
      <div class="p-6 border border-gray-300 rounded-lg shadow-md bg-white flex flex-col">
        <div class="flex items-center gap-3 mb-2">
          <font-awesome-icon :icon="['fas', 'database']" class="text-blue-500 w-6 h-6" />
          <h3 class="text-xl font-semibold">Bases de Datos</h3>
        </div>
        <ul class="list-disc list-inside mb-4">
          <li>SQL</li>
          <li>NoSQL</li>
          <li>PostgreSQL</li>
          <li>MySQL</li>
          <li>Oracle</li>
        </ul>
        <!-- Tecnologías FontAwesome -->
        <div class="flex gap-4 text-gray-400 text-2xl mt-2 justify-center">
          <font-awesome-icon :icon="['fas', 'database']" />
          <font-awesome-icon :icon="['fas', 'server']" />
        </div>
      </div>

      <!-- DevOps -->
      <div class="p-6 border border-gray-300 flex rounded-lg shadow-md bg-white flex-col">
        <div class="flex items-center gap-3 mb-2">
          <font-awesome-icon :icon="['fas', 'layer-group']" class="text-blue-500 w-6 h-6" />
          <h3 class="text-xl font-semibold">DevOps</h3>
        </div>
        <ul class="list-disc list-inside mb-4">
          <li>Docker</li>
          <li>Kubernetes</li>
          <li>Git</li>
          <li>CI/CD</li>
          <li>Linux/Bash</li>
        </ul>
        <!-- Tecnologías FontAwesome -->
        <div class="flex gap-4 text-gray-400 text-2xl mt-2 justify-center">
          <font-awesome-icon :icon="['fab', 'docker']" />
          <font-awesome-icon :icon="['fab', 'git-alt']" />
          <font-awesome-icon :icon="['fab', 'github']" />
          <font-awesome-icon :icon="['fab', 'gitlab']" />
          <font-awesome-icon :icon="['fas', 'terminal']" />
        </div>
      </div>
    </div>

    <!-- Card extras (1 columna siempre) -->
    <div class="grid grid-cols-1 gap-6">
      <div class="p-6 border border-gray-300 rounded-lg shadow-md bg-white flex flex-col">
        <div class="flex items-center gap-3 mb-2">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-blue-500 w-6 h-6" />
          <h3 class="text-xl font-semibold">Extras</h3>
        </div>
        <ul class="list-disc list-inside mb-4">
          <li>Vtex y Shopify</li>
          <li>Pruebas unitarias (frontend y backend)</li>
          <li>Arquitectura hexagonal</li>
          <li>Proactividad y autodidacta</li>
        </ul>
        <!-- Tecnologías FontAwesome -->
        <div class="flex gap-4 text-gray-400 text-2xl mt-2 justify-center">
          <font-awesome-icon :icon="['fab', 'shopify']" />
          <font-awesome-icon :icon="['fab', 'aws']" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
