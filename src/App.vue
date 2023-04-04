<template>
  <v-app>
    <v-main>
      <Navbar />

      <v-container>
        <Suspense>
          <router-view />
        </Suspense>

        <SnackbarAlerts />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import SnackbarAlerts from "@/components/SnackbarAlerts.vue";
import Footer from "@/components/Footer.vue";
</script>
