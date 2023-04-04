import { ref } from "vue";
import type { GeneratePlaylistData, SpotifyTrack } from "@/utils/types";
import {
  generateSpotifyPlaylistAPI,
  searchSpotifyTrack,
  addTracksToSpotifyPlaylistAPI,
} from "@/utils/api";
import { useSnackbar } from "@/utils/composables/useSnackbar";

const isGeneratingPlaylist = ref(false);

export function useSpotify() {
  const { displaySnackbar } = useSnackbar();

  const generateSpotifyPlaylist = async (
    generatePlaylistData: GeneratePlaylistData
  ) => {
    isGeneratingPlaylist.value = true;

    try {
      const playlistData = await generateSpotifyPlaylistAPI(
        generatePlaylistData
      );

      const promiseTracksData = await Promise.allSettled(
        generatePlaylistData.songs.map(async (song) => {
          const data = await searchSpotifyTrack(
            song,
            generatePlaylistData.artistName
          );
          return data;
        })
      );

      const tracks: SpotifyTrack[] = (
        promiseTracksData.filter(
          ({ status }) => status === "fulfilled"
        ) as PromiseFulfilledResult<any>[]
      )
        .map((promiseData) => {
          return promiseData.value.tracks.items[0];
        })
        .filter(Boolean);

      const tracksUris = tracks.map((track) => track.uri).join(",");

      await addTracksToSpotifyPlaylistAPI(playlistData.id, tracksUris);
      displaySnackbar("Your playlist was created successfully!", "#1db954");
    } catch (error) {
      displaySnackbar(
        "An error occurred while creating your playlist, please try again.",
        "red"
      );
    }

    isGeneratingPlaylist.value = false;
  };

  return {
    generateSpotifyPlaylist,
    isGeneratingPlaylist,
  };
}
