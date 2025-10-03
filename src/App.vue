<script setup lang="ts">
import HomeComponent from './components/HomeComponent.vue'
import ContactsComponent from './components/ContactsComponent.vue'
import AbautComponent from './components/AbautComponent.vue'
import CertificationsComponent from './components/CertificationsComponent.vue'
</script>

<template>
  <section class="min-h-screen flex flex-col px-6 py-16 bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Hero principal -->
    <HomeComponent />

    <!-- Separador -->
    <hr class="border-t border-gray-200 my-8" />

    <!-- Sección de contactos -->
    <ContactsComponent />

    <!-- Sección sobre mí -->
    <AbautComponent />

    <!-- Sección de certificaciones -->
    <CertificationsComponent />
  </section>
</template>

<style scoped></style>
