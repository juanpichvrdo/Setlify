<template>
  <v-toolbar prominent :elevation="8">
    <v-container>
      <v-row>
        <v-toolbar-title>
          <router-link :to="{ name: 'Home' }">
            <v-img
              v-if="isDarkMode"
              :width="80"
              src="@/assets/logo-light.svg"
            />
            <v-img v-else :width="80" src="@/assets/logo-dark.svg" />
          </router-link>
        </v-toolbar-title>

        <v-btn @click="toggleTheme">
          <v-icon
            size="large"
            :icon="isDarkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'"
          ></v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const isDarkMode = ref(true);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>

<style scoped></style>
