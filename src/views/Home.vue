<template>
  <div>
    <v-btn
      color="primary"
      min-width="228"
      size="x-large"
      target="_blank"
      variant="flat"
      @click="onLoginToSpotify"
    >
      LOGIN TO SPOTIFY
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import {
  useSpotifyAuth,
  redirectToAuth,
} from "@/utils/composables/useSpotifyAuth";

await useSpotifyAuth();

const onLoginToSpotify = async () => {
  await redirectToAuth();
};
</script>
