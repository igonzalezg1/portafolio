<script setup lang="ts"></script>

<template>
  <section
    id="contacto"
    class="w-full flex flex-col items-center justify-center py-16 bg-white/70 rounded-xl shadow-md p-8 relative"
  >
    <!-- Card -->
    <div class="flex gap-16 mb-20">
      <!-- LinkedIn -->
      <a
        href="https://www.linkedin.com/in/gonzalezivan2000"
        target="_blank"
        class="text-blue-700 hover:text-blue-500 transition-transform transform hover:scale-125"
      >
        <font-awesome-icon :icon="['fab', 'linkedin']" class="text-4xl" />
      </a>

      <!-- Email -->
      <a
        href="mailto:gonzalezgarciaivandejesus@gmail.com"
        class="text-red-600 hover:text-red-400 transition-transform transform hover:scale-125"
      >
        <font-awesome-icon :icon="['fas', 'envelope']" class="text-4xl" />
      </a>

      <!-- Teléfono -->
      <a
        href="tel:+527291097554"
        class="text-green-600 hover:text-green-400 transition-transform transform hover:scale-125"
      >
        <font-awesome-icon :icon="['fas', 'phone']" class="text-4xl" />
      </a>
    </div>

    <!-- Mouse animado mejorado -->
    <div class="absolute bottom-8 flex flex-col items-center gap-3">
      <!-- Mouse -->
      <div class="relative">
        <!-- Cuerpo del mouse -->
        <div
          class="w-7 h-11 border-2 border-gray-800 rounded-full flex justify-center pt-2 bg-white/50 backdrop-blur-sm shadow-lg"
        >
          <!-- Rueda del mouse animada -->
          <div class="w-1 h-3 bg-gray-800 rounded-full animate-scroll"></div>
        </div>

        <!-- Línea divisoria del mouse (botones) -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-4 bg-gray-800/30"></div>
      </div>

      <!-- Texto -->
      <div class="flex flex-col items-center gap-1">
        <p class="text-xs text-gray-600 font-medium tracking-wider uppercase animate-pulse">
          Scrollea para continuar
        </p>
        <!-- Flecha hacia abajo -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-600 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animación personalizada para la rueda del mouse */
@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0.5;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-scroll {
  animation: scroll 2s ease-in-out infinite;
}

/* Ajuste del bounce para la flecha */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>
