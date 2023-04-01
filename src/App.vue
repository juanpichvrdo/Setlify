<template>
  <v-app>
    <v-main>
      <Navbar />

      <v-container>
        <Suspense>
          <router-view />
        </Suspense>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>
