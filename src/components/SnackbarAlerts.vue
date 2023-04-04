<template>
  <v-snackbar :color="snackbarColor" v-model="shouldOpenSnackbar">
    <p class="text-white">{{ snackbarMessage }}</p>

    <template v-slot:actions>
      <v-btn variant="text" @click="shouldOpenSnackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from "@/utils/composables/useSnackbar";

const { shouldOpenSnackbar, snackbarMessage, snackbarColor } = useSnackbar();
</script>

<style scoped></style>
