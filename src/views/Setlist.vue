<template>
  <div v-if="isLoading" class="setlist__loader-container">
    <v-progress-circular indeterminate :size="128" :width="12" />
  </div>

  <v-card v-else-if="setlist?.set?.length" class="setlist mb-16 mx-auto">
    <v-btn
      v-if="isAuthenticated"
      class="text-white"
      elevation="5"
      block
      rounded="md"
      color="#1db954"
      size="x-large"
      append-icon="mdi-spotify"
      @click="onGeneratePlaylist"
    >
      Generate playlist
    </v-btn>

    <v-btn
      v-else
      class="text-white"
      elevation="5"
      block
      rounded="lg"
      color="#1db954"
      size="x-large"
      append-icon="mdi-spotify"
      @click="onLoginToSpotify"
    >
      Login to spotify
    </v-btn>

    <v-text-field
      v-model="playlistTitle"
      class="mt-4"
      id="playlistTitle"
      variant="solo"
      label="Playlist title"
      hide-details
      append-inner-icon="mdi-pencil-outline"
    />

    <v-divider />

    <v-list>
      <v-list-subheader class="text-center">
        <template v-if="songsToCreatePlaylist">
          {{ songsToCreatePlaylist.length }}
        </template>
        / {{ setlist.set.length }} Selected tracks
      </v-list-subheader>

      <template v-for="(song, i) in setlist.set" :key="song + '-' + i">
        <v-list-item :value="song.name" active-color="primary">
          <template v-slot:prepend>
            <v-list-item-action start>
              <v-checkbox-btn
                v-model="songsToCreatePlaylist"
                color="#1db954"
                :value="song.name"
              />
            </v-list-item-action>
          </template>

          <v-list-item-title>
            <strong>
              {{ song.name }}
            </strong>
          </v-list-item-title>
        </v-list-item>

        <v-divider v-if="i !== setlist.set.length - 1" />
      </template>
    </v-list>
  </v-card>

  <!-- TODO: Improve design of this message -->
  <div class="text-center mt-16" v-else>No tracks available</div>

  <v-overlay
    :model-value="isGeneratingPlaylist"
    class="align-center justify-center"
  >
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="text-h4 text-center font-weight-bold" cols="12">
        Generating your playlist
      </v-col>
      <v-col cols="12">
        <v-progress-linear
          color="#1db954"
          indeterminate
          rounded
          height="12"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useSpotifyAuth } from "@/utils/composables/useSpotifyAuth";
import { useSetlists } from "@/utils/composables/useSetlists";
import { useSpotify } from "@/utils/composables/useSpotify";
import type { SpotifyUser } from "@/utils/types";

const route = useRoute();
const { isAuthenticated, redirectToAuth, loginToSpotify } = useSpotifyAuth();
const { getSelectedSetlist, isLoading } = useSetlists();
const { generateSpotifyPlaylist, isGeneratingPlaylist } = useSpotify();

await loginToSpotify();

const setlist = await getSelectedSetlist(route.params.setlistId as string);

const playlistDefaultTitle = `${setlist?.artist.name} at ${setlist?.venue.name} - ${setlist?.eventDate}`;
const playlistTitle = ref(playlistDefaultTitle);
const songsToCreatePlaylist = ref(setlist?.set?.map((song) => song.name));

const onGeneratePlaylist = async () => {
  // TODO: Show songs by other artists that are on the setlist
  const spotifyUserJson = localStorage.getItem("spotifyUser");
  const spotifyUser: SpotifyUser = JSON.parse(spotifyUserJson as string);

  const songs = setlist?.set
    .filter((song) => songsToCreatePlaylist.value?.includes(song.name))
    .map((song) => song.name) as string[];

  const playlistData = {
    userId: spotifyUser.id,
    playlistTitle: playlistTitle.value || playlistDefaultTitle,
    artistName: setlist?.artist.name as string,
    // TODO: Make this user input
    isPublic: true,
    songs,
  };

  generateSpotifyPlaylist(playlistData);
};

const onLoginToSpotify = async () => {
  if (route.params.setlistId) {
    sessionStorage.setItem(
      "setlistRedirectId",
      route.params.setlistId as string
    );
  }

  await redirectToAuth();
};
</script>

<style scoped>
.setlist__loader-container {
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.setlist {
  max-width: 700px;
  margin-top: 7vh;
}
</style>
