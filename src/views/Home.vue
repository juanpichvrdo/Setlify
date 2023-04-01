<template>
  <div>
    <Search :is-loading="isLoading" @on-setlist-search="searchSetlist" />

    <pre>
      {{ setlistData }}
    </pre>
    <!-- <v-btn
      color="primary"
      min-width="228"
      size="x-large"
      target="_blank"
      variant="flat"
      @click="onLoginToSpotify"
    >
      LOGIN TO SPOTIFY
    </v-btn> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  useSpotifyAuth,
  // redirectToAuth,
} from "@/utils/composables/useSpotifyAuth";
import { useSetlists } from "@/utils/composables/useSetlists";
import Search from "@/components/Search.vue";

await useSpotifyAuth();

const setlistData = ref({});
const { getSetlists, isLoading } = await useSetlists();

const searchSetlist = async (searchTerm: string) => {
  const data = await getSetlists(searchTerm);
  setlistData.value = data;
};

// const onLoginToSpotify = async () => {
//   await redirectToAuth();
// };
</script>
