<script setup lang="ts"></script>

<template>
  <section
    id="contacto"
    class="w-full flex flex-col items-center justify-center py-16 bg-white/30 rounded-xl shadow-xl p-8 relative"
  >
    <!-- Card -->
    <div class="flex gap-16 mb-20">
      <!-- LinkedIn -->
      <a
        href="https://www.linkedin.com/in/gonzalezivan2000"
        target="_blank"
        class="text-blue-700 hover:text-blue-500 transition-transform transform hover:scale-125"
      >
        <font-awesome-icon :icon="['fab', 'linkedin']" class="w-20 h-20 md:w-28 md:h-28" />
      </a>

      <!-- Email -->
      <a
        href="mailto:gonzalezgarciaivandejesus@gmail.com"
        class="text-red-600 hover:text-red-400 transition-transform transform hover:scale-125"
      >
        <font-awesome-icon :icon="['fas', 'envelope']" class="w-20 h-20 md:w-28 md:h-28" />
      </a>

      <!-- Teléfono -->
      <a
        href="tel:+527291097554"
        class="text-green-600 hover:text-green-400 transition-transform transform hover:scale-125"
      >
        <font-awesome-icon :icon="['fas', 'phone']" class="w-20 h-20 md:w-28 md:h-28" />
      </a>
    </div>

    <!-- Mouse animado -->
    <div class="absolute bottom-10">
      <div class="w-6 h-10 border-2 border-gray-900 rounded-full flex justify-center">
        <div class="w-2 h-2 bg-gray-900 rounded-full animate-bounce mt-1"></div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
