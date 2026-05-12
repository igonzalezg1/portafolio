<script setup lang="ts"></script>

<template>
  <section class="skills-section">
    <h2 class="section-heading">Skills tecnológicos</h2>

    <div class="skills-grid">
      <!-- Backend -->
      <div class="skill-card">
        <div class="skill-card-header">
          <font-awesome-icon :icon="['fas', 'code']" class="skill-icon" />
          <h3 class="skill-card-title">Backend</h3>
        </div>
        <ul class="skill-list">
          <li>PHP / Laravel</li>
          <li>NodeJS</li>
          <li>Java / Spring Boot</li>
          <li>C# / .NET</li>
          <li>Golang</li>
        </ul>
        <div class="skill-icons-row">
          <font-awesome-icon :icon="['fab', 'laravel']" />
          <font-awesome-icon :icon="['fab', 'node-js']" />
          <font-awesome-icon :icon="['fab', 'java']" />
        </div>
      </div>

      <!-- Frontend -->
      <div class="skill-card">
        <div class="skill-card-header">
          <font-awesome-icon :icon="['fas', 'palette']" class="skill-icon" />
          <h3 class="skill-card-title">Frontend</h3>
        </div>
        <ul class="skill-list">
          <li>VueJS</li>
          <li>Angular</li>
          <li>React</li>
          <li>CSS / Tailwind / Bootstrap</li>
          <li>Figma / UX·UI</li>
          <li>Quasar / Angular Material</li>
        </ul>
        <div class="skill-icons-row">
          <font-awesome-icon :icon="['fab', 'vuejs']" />
          <font-awesome-icon :icon="['fab', 'angular']" />
          <font-awesome-icon :icon="['fab', 'react']" />
        </div>
      </div>

      <!-- Bases de datos -->
      <div class="skill-card">
        <div class="skill-card-header">
          <font-awesome-icon :icon="['fas', 'database']" class="skill-icon" />
          <h3 class="skill-card-title">Bases de Datos</h3>
        </div>
        <ul class="skill-list">
          <li>SQL / NoSQL</li>
          <li>PostgreSQL</li>
          <li>MySQL</li>
          <li>Oracle</li>
        </ul>
        <div class="skill-icons-row">
          <font-awesome-icon :icon="['fas', 'database']" />
          <font-awesome-icon :icon="['fas', 'server']" />
        </div>
      </div>

      <!-- DevOps -->
      <div class="skill-card">
        <div class="skill-card-header">
          <font-awesome-icon :icon="['fas', 'layer-group']" class="skill-icon" />
          <h3 class="skill-card-title">DevOps</h3>
        </div>
        <ul class="skill-list">
          <li>Docker</li>
          <li>Kubernetes</li>
          <li>Git / CI·CD</li>
          <li>Linux / Bash</li>
        </ul>
        <div class="skill-icons-row">
          <font-awesome-icon :icon="['fab', 'docker']" />
          <font-awesome-icon :icon="['fab', 'git-alt']" />
          <font-awesome-icon :icon="['fab', 'github']" />
          <font-awesome-icon :icon="['fab', 'gitlab']" />
          <font-awesome-icon :icon="['fas', 'terminal']" />
        </div>
      </div>
    </div>

    <!-- Extras -->
    <div class="skill-card skill-card--wide">
      <div class="skill-card-header">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" class="skill-icon" />
        <h3 class="skill-card-title">Extras</h3>
      </div>
      <ul class="skill-list skill-list--inline">
        <li>Vtex y Shopify</li>
        <li>Pruebas unitarias (frontend y backend)</li>
        <li>Arquitectura hexagonal</li>
        <li>Proactividad y autodidacta</li>
      </ul>
      <div class="skill-icons-row">
        <font-awesome-icon :icon="['fab', 'shopify']" />
        <font-awesome-icon :icon="['fab', 'aws']" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
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

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: #dde1e6;
  border: 1px solid #dde1e6;
}

@media (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.skill-card {
  background: #ffffff;
  padding: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.skill-card--wide {
  border: 1px solid #dde1e6;
  background: #ffffff;
  margin-top: 0;
}

.skill-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f4f5f7;
}

.skill-icon {
  color: #0052cc;
  font-size: 0.75rem;
}

.skill-card-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.skill-list li {
  font-size: 0.8125rem;
  color: #42526e;
  padding: 0.125rem 0 0.125rem 0.625rem;
  border-left: 2px solid #ebecf0;
}

.skill-list--inline {
  flex-direction: row;
  flex-wrap: wrap;
}

.skill-list--inline li {
  border-left: none;
  padding: 0.125rem 0.5rem;
  background: #ebecf0;
  color: #172b4d;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
}

.skill-icons-row {
  display: flex;
  gap: 0.625rem;
  color: #b3b9c4;
  font-size: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f4f5f7;
}
</style>
