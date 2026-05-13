<script setup lang="ts"></script>

<template>
  <section id="contacto" class="contact-bar">
    <div class="contact-links">
      <a href="https://www.linkedin.com/in/gonzalezgivan2000" target="_blank" class="contact-link">
        <font-awesome-icon :icon="['fab', 'linkedin']" class="contact-icon" />
        <span>LinkedIn</span>
      </a>

      <a href="mailto:gonzalezgarciaivandejesus@gmail.com" class="contact-link">
        <font-awesome-icon :icon="['fas', 'envelope']" class="contact-icon" />
        <span>gonzalezgarciaivandejesus@gmail.com</span>
      </a>

      <a href="tel:+527291097554" class="contact-link">
        <font-awesome-icon :icon="['fas', 'phone']" class\="contact-icon" />
        <span>+52 729-109-7554</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-bar {
  padding: 0.875rem 0;
  border-bottom: 1px solid #dde1e6;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #42526e;
  text-decoration: none;
  font-size: 0.8125rem;
  transition: color 0.15s;
}

.contact-link:hover {
  color: #0052cc;
}

.contact-icon {
  font-size: 0.875rem;
  color: #6b778c;
}

.contact-link:hover .contact-icon {
  color: #0052cc;
}
</style>
