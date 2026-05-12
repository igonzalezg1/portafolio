<script setup lang="ts"></script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-name">Iván González García</span>
          <span class="footer-role">Desarrollador Full-Stack</span>
        </div>
        <p class="footer-tagline">Disponible para proyectos freelance y oportunidades full-time</p>
      </div>

      <div class="footer-divider" />

      <div class="footer-contacts">
        <a href="mailto:gonzalezgarciaivandejesus@gmail.com" class="footer-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="footer-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>gonzalezgarciaivandejesus@gmail.com</span>
        </a>

        <a
          href="https://www.linkedin.com/in/gonzalezgivan2000"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="footer-icon"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            />
          </svg>
          <span>gonzalezivan2000</span>
        </a>

        <a href="tel:+527291097554" class="footer-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="footer-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>+52 729-109-7554</span>
        </a>
      </div>

      <div class="footer-divider" />

      <div class="footer-bottom">
        <span class="footer-copy">
          © {{ new Date().getFullYear() }} Iván González García
        </span>
        <span class="footer-location">Ciudad de México, México</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #172b4d;
  color: #ffffff;
  border-top: 2px solid #0052cc;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 24px 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-top {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

@media (min-width: 640px) {
  .footer-top {
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }
}

.footer-brand {
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
}

.footer-name {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
}

.footer-role {
  font-size: 0.6875rem;
  color: #8993a4;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: 'Courier New', monospace;
}

.footer-tagline {
  font-size: 0.8125rem;
  color: #8993a4;
  margin: 0;
}

.footer-divider {
  height: 1px;
  background: #2d3f5c;
}

.footer-contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #8993a4;
  text-decoration: none;
  font-size: 0.8125rem;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #ffffff;
}

.footer-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-copy {
  font-size: 0.75rem;
  color: #6b778c;
}

.footer-location {
  font-size: 0.75rem;
  color: #6b778c;
  font-family: 'Courier New', monospace;
}
</style>
