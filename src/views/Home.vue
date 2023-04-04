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

    <div v-if="shouldShowNoResultsMessage" class="home__no-results">
      <p>Couldn't find any setlists with this search.</p>
    </div>

    <SetlistList
      v-if="setlistsFormattedData"
      class="mt-8 mb-16"
      :setlists="setlistsFormattedData"
    />
  </div>
</template>

<script lang="ts" setup>
import { useSpotifyAuth } from "@/utils/composables/useSpotifyAuth";
import { useSetlists } from "@/utils/composables/useSetlists";
import { useThemeToggle } from "@/utils/composables/useThemeToggle";
import Search from "@/components/Search.vue";
import SetlistList from "@/components/SetlistList.vue";

const { isDarkMode } = useThemeToggle();
const { loginToSpotify } = useSpotifyAuth();
const {
  setlistsFormattedData,
  getSetlists,
  isLoading,
  shouldShowNoResultsMessage,
} = await useSetlists();

await loginToSpotify();

const searchSetlists = async (searchTerm: string) => {
  await getSetlists(searchTerm);
};
</script>

<style>
.home {
  max-width: 700px;
}

.home__logo {
  margin-top: 15vh;
}

.home__no-results {
  margin-top: 80px;
  font-size: 24px;
  text-align: center;
}
</style>
