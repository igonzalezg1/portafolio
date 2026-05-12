<script setup lang="ts">
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <section class="certs-section">
    <div class="certs-header">
      <font-awesome-icon :icon="faTrophy" class="trophy-icon" />
      <h2 class="section-heading">Estudios y Certificaciones</h2>
    </div>

    <div class="certs-grid">
      <div class="cert-item">
        <h3 class="cert-title">Ingeniería en Tecnologías de la Información</h3>
        <div class="cert-meta">
          <span class="cert-institution">Instituto Tecnológico de Toluca</span>
          <span class="cert-date">Jul 2022</span>
        </div>
      </div>

      <div class="cert-item">
        <h3 class="cert-title">Técnico en Informática</h3>
        <div class="cert-meta">
          <span class="cert-institution">CBT No. 3 Toluca</span>
          <span class="cert-date">Jul 2017</span>
        </div>
      </div>

      <div class="cert-item">
        <h3 class="cert-title">
          Construye Microservicios Docker, Kubernetes, Spring Boot, Spring Cloud, LoadBalancer,
          Security JWT, Amazon AWS ECS y EKS
        </h3>
        <div class="cert-meta">
          <span class="cert-institution">Udemy</span>
          <span class="cert-date">Enero 2025</span>
        </div>
      </div>

      <div class="cert-item">
        <h3 class="cert-title">
          Alternativas modernas para la Arquitectura de Software. Domain Driven Design, CQRS,
          Eventos, Microservicios y mucho más!
        </h3>
        <div class="cert-meta">
          <span class="cert-institution">Udemy</span>
          <span class="cert-date">Marzo 2025</span>
        </div>
      </div>

      <div class="cert-item">
        <h3 class="cert-title">
          Aprende Tailwind CSS desde cero: Utilidades básicas, diseño avanzado y personalización
          completa
        </h3>
        <div class="cert-meta">
          <span class="cert-institution">Udemy</span>
          <span class="cert-date">Junio 2023</span>
        </div>
      </div>

      <div class="cert-item">
        <h3 class="cert-title">
          Aprende Vue 3, Vue-CLI, Bindings, API, Router, Vuex, Componentes, Formularios, Composition
          API
        </h3>
        <div class="cert-meta">
          <span class="cert-institution">Udemy</span>
          <span class="cert-date">Julio 2023</span>
        </div>
      </div>

      <div class="cert-item">
        <h3 class="cert-title">
          El mejor curso Java con aplicaciones del mundo real (Escritorio, Web y Full Stack) Spring,
          Hibernate, JakartaEE, ChatGPT
        </h3>
        <div class="cert-meta">
          <span class="cert-institution">Udemy</span>
          <span class="cert-date">Agosto 2025</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.certs-section {
  padding: 2rem 0;
}

.certs-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dde1e6;
}

.trophy-icon {
  color: #0052cc;
  font-size: 0.75rem;
}

.section-heading {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #0052cc;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.certs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: #dde1e6;
  border: 1px solid #dde1e6;
}

@media (min-width: 768px) {
  .certs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cert-item {
  background: #ffffff;
  padding: 1rem 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.cert-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
  line-height: 1.45;
}

.cert-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
}

.cert-institution {
  font-size: 0.75rem;
  color: #6b778c;
}

.cert-date {
  font-size: 0.6875rem;
  color: #0052cc;
  font-family: 'Courier New', monospace;
  background: #deebff;
  padding: 0.1rem 0.4rem;
}
</style>
