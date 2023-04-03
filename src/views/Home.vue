<template>
  <div class="home mx-auto">
    <div class="home__logo">
      <v-img
        v-if="isDarkMode"
        class="mx-auto"
        :width="200"
        src="@/assets/logo-light.svg"
      />
      <v-img v-else class="mx-auto" :width="200" src="@/assets/logo-dark.svg" />
    </div>

    <Search
      class="mt-12"
      :is-loading="isLoading"
      @on-setlist-search="searchSetlists"
    />

    <SetlistList
      class="mt-8 mb-16"
      v-if="setlistsFormattedData"
      :setlists="setlistsFormattedData"
    />

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
import { ref, computed } from "vue";

import format from "date-fns/format";
import {
  useSpotifyAuth,
  // redirectToAuth,
} from "@/utils/composables/useSpotifyAuth";
import { useSetlists } from "@/utils/composables/useSetlists";
import { useThemeToggle } from "@/utils/composables/useThemeToggle";

import { convertToDate } from "@/utils/helpers";

import type { SetlistResponse } from "@/utils/types";

import Search from "@/components/Search.vue";
import SetlistList from "@/components/SetlistList.vue";

const { isDarkMode } = useThemeToggle();

await useSpotifyAuth();

const setlistData = ref<SetlistResponse | null>(null);
const { getSetlists, isLoading } = await useSetlists();

const searchSetlists = async (searchTerm: string) => {
  const data = await getSetlists(searchTerm);
  setlistData.value = data;
};

const setlistsFormattedData = computed(() => {
  return setlistData.value?.setlist?.map((setlist) => {
    const { artist, eventDate, id, url, venue, info } = setlist;

    const dateObject = convertToDate(eventDate);
    const formattedDate = format(dateObject, "MMMM do, y");

    return {
      artist,
      eventDate: formattedDate,
      id,
      url,
      venue,
      info,
      set: setlist.sets.set[0]?.song,
    };
  });
});

// const onLoginToSpotify = async () => {
//   await redirectToAuth();
// };
</script>

<style>
.home {
  max-width: 700px;
}

.home__logo {
  margin-top: 15vh;
}
</style>
