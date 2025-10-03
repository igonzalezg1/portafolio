<script setup lang="ts">
interface Experience {
  year: string
  company: string
  position: string
  description: string
  technologies: string[]
}

const experiences: Experience[] = [
  {
    year: '2025',
    company: 'B-process',
    position: 'Desarrollador Mid Full-Stack',
    description:
      'Lideré el desarrollo de microservicios para el Sistema Penitenciario Federal, mejorando la eficiencia del sistema en un 20%. Implementación de microservicios de selectores en catálogos del MEF (Perú) que ayudó a tener una mejor escalabilidad del sistema.',
    technologies: [
      'Laravel',
      'Spring Boot',
      'Docker',
      'Kubernetes',
      'Oracle DB',
      'MySQL',
      'SCRUM',
      'Angular',
      'VueJS',
      'Git',
      'GitHub Actions',
    ],
  },
  {
    year: '2023',
    company: 'INFOTEC',
    position: 'Desarrollador Mid Full-Stack',
    description:
      'Diseño e implementación de soluciones tecnológicas innovadoras para la Secretaría de Relaciones Exteriores, que ayudaron a implementar soluciones tecnológicas de alto impacto a nivel internacional, como lo puede ser Visa Electrónica (referencia del sistema: https://visasnews.com/es/mexico-se-dispone-a-lanzar-un-nuevo-sistema-de-visado-electronico). Desarrollo de aplicaciones web para la optimización de procesos institucionales usando metodologías ágiles como Laravel y PostgreSQL, así como el uso de la metodología SCRUM.',
    technologies: [
      'Laravel',
      'PostgreSQL',
      'SCRUM',
      'VueJS',
      'TailwindCSS',
      'Git',
      'Quasar',
      'Figma',
      'UX/UI',
    ],
  },
  {
    year: '2022',
    company: 'doto.com.mx',
    position: 'Desarrollador Jr.',
    description:
      'Desarrollo de middleware entre sellers y usuarios finales, mejorando la comunicación y el flujo de datos entre plataformas. Generación de guías de paquetería y crossdocking para optimizar el proceso logístico. Mantenimiento y mejoras continuas de plataformas de devoluciones y Seller Center.',
    technologies: [
      'VueJS',
      'Crossdocking',
      'JavaScript',
      'CSS',
      'HTML',
      'Git',
      'GitHub',
      'Laravel',
      'Vtex',
      'AWS',
    ],
  },
  {
    year: '2021',
    company: 'Empresa Virtual',
    position: 'Desarrollador Jr.',
    description:
      'Creación de dashboards de alta disponibilidad para reportes de prevención y mantenimiento. Desarrollo y soporte de la aplicación “Sumapp”, contribuyendo a su integración con sistemas externos.',
    technologies: [
      'VueJS',
      'JavaScript',
      'CSS',
      'HTML',
      'Git',
      'GitHub',
      'Laravel',
      'Docker',
      'AWS',
    ],
  },
]
</script>

<template>
  <section class="p-6 bg-white/50">
    <h2 class="text-5xl font-bold mb-8 text-center">Principal experiencia Laboral</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="border-l-4 border-blue-500 bg-white rounded-lg shadow-md p-6 flex flex-col"
      >
        <!-- Año y empresa -->
        <div class="flex items-center mb-2">
          <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
            {{ exp.year }}
          </span>
          <h3 class="text-lg font-semibold text-gray-700">{{ exp.company }}</h3>
        </div>

        <!-- Puesto -->
        <h4 class="text-blue-600 font-semibold mb-2">{{ exp.position }}</h4>

        <!-- Descripción -->
        <p class="text-gray-600 mb-4">{{ exp.description }}</p>

        <!-- Tecnologías -->
        <div class="flex flex-wrap gap-2 mt-auto">
          <span
            v-for="(tech, idx) in exp.technologies"
            :key="idx"
            class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Opcional: Hover effect para cada card */
div[v-for]:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease-in-out;
}
</style>
