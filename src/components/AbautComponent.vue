<script setup lang="ts"></script>

<template>
  <div class="about-section">
    <h2 class="section-label">Sobre mí</h2>
    <p class="about-text">
      Ingeniero en Tecnologías de la Información especializado en desarrollo full-stack y
      arquitecturas de microservicios. <br /><br />
      He liderado proyectos de alto impacto como el Sistema de Visa Electrónica para la Secretaría
      de Relaciones Exteriores y Sistemas Penitenciarios Federales. <br /><br />
      Apasionado por crear soluciones escalables, limpias y mantenibles usando las mejores prácticas
      del sector.
    </p>
  </div>
</template>

<style scoped>
.about-section {
  padding: 1.75rem 0 1.75rem 1.25rem;
  border-left: 3px solid #0052cc;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-label {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #0052cc;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.about-text {
  color: #42526e;
  line-height: 1.7;
  font-size: 0.9375rem;
  margin: 0;
  max-width: 72ch;
}
</style>
