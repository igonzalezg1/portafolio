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
      'Creación de dashboards de alta disponibilidad para reportes de prevención y mantenimiento. Desarrollo y soporte de la aplicación "Sumapp", contribuyendo a su integración con sistemas externos.',
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
  <section class="exp-section">
    <h2 class="section-heading">Experiencia Laboral</h2>

    <div class="exp-grid">
      <div v-for="(exp, index) in experiences" :key="index" class="exp-card">
        <div class="exp-meta">
          <span class="exp-year">{{ exp.year }}</span>
          <span class="exp-company">{{ exp.company }}</span>
        </div>
        <h3 class="exp-position">{{ exp.position }}</h3>
        <p class="exp-description">{{ exp.description }}</p>
        <div class="exp-tags">
          <span v-for="(tech, idx) in exp.technologies" :key="idx" class="exp-tag">
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp-section {
  padding: 2rem 0;
}

.section-heading {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #0052cc;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dde1e6;
}

.exp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: #dde1e6;
  border: 1px solid #dde1e6;
}

@media (min-width: 768px) {
  .exp-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.exp-card {
  background: #ffffff;
  padding: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-left: 3px solid #0052cc;
}

.exp-meta {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.exp-year {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #0052cc;
  background: #deebff;
  padding: 0.1rem 0.5rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
}

.exp-company {
  font-size: 0.875rem;
  font-weight: 600;
  color: #172b4d;
}

.exp-position {
  font-size: 0.8125rem;
  color: #0052cc;
  font-weight: 500;
  margin: 0;
}

.exp-description {
  font-size: 0.8125rem;
  color: #42526e;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.exp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  padding-top: 0.625rem;
  border-top: 1px solid #f4f5f7;
  margin-top: auto;
}

.exp-tag {
  font-size: 0.6875rem;
  color: #172b4d;
  background: #ebecf0;
  padding: 0.1rem 0.5rem;
  font-family: 'Courier New', monospace;
}
</style>
