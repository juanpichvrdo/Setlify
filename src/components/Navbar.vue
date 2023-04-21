<template>
  <v-toolbar :elevation="8">
    <v-container>
      <v-row>
        <v-toolbar-title class="title-logo px-3">
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
        <v-btn v-if="isAuthenticated" @click="logoutFromSpotify">
          Logout
        </v-btn>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useThemeToggle } from "@/utils/composables/useThemeToggle";
import { useSpotifyAuth } from "@/utils/composables/useSpotifyAuth";

const { isDarkMode, toggleTheme } = useThemeToggle();
const { logout, isAuthenticated } = useSpotifyAuth();

const logoutFromSpotify = () => {
  logout();
  isAuthenticated.value = false;
};
</script>

<style scoped>
.title-logo {
  max-width: fit-content;
  margin-right: auto;
}
</style>
