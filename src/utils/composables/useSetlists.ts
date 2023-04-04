import { ref, computed } from "vue";
import format from "date-fns/format";
import { convertToDate } from "@/utils/helpers";
import type {
  SetlistResponse,
  SetlistsFormatted,
  Setlist,
} from "@/utils/types";
import { getSetlistsAPI, getSetlistByIdAPI } from "@/utils/api";
import { useSnackbar } from "@/utils/composables/useSnackbar";

const isLoading = ref(false);
const setlistData = ref<SetlistResponse | null>(null);
const shouldShowNoResultsMessage = ref(false);

export function useSetlists() {
  const { displaySnackbar } = useSnackbar();

  const getSetlists = async (searchTerm: string) => {
    shouldShowNoResultsMessage.value = false;

    try {
      const params = {
        artistName: searchTerm,
        p: 1,
      };

      isLoading.value = true;
      setlistData.value = await getSetlistsAPI(params);
    } catch (error) {
      displaySnackbar(
        "An error occurred while searching the setlist, please try again.",
        "red"
      );
    }
    isLoading.value = false;
  };

  const formatSetlistData = (setlist: Setlist): SetlistsFormatted => {
    const { artist, eventDate, id, venue, info } = setlist;

    const dateObject = convertToDate(eventDate);
    const formattedDate = format(dateObject, "MMMM do, y");

    return {
      artist,
      eventDate: formattedDate,
      id,
      venue,
      info,
      set: setlist.sets.set[0]?.song,
    };
  };

  const setlistsFormattedData = computed(() => {
    return setlistData.value?.setlist?.map(formatSetlistData);
  });

  const getSelectedSetlist = async (setlistId: string) => {
    try {
      if (setlistsFormattedData.value) {
        return setlistsFormattedData.value.find(
          (setlist) => setlist.id === setlistId
        );
      }

      isLoading.value = true;
      const data = await getSetlistByIdAPI(setlistId);
      isLoading.value = false;

      return formatSetlistData(data);
    } catch (error) {
      displaySnackbar(
        "An error occurred while searching the setlist, please try again.",
        "red"
      );
    }
  };

  return {
    setlistData,
    setlistsFormattedData,
    getSetlists,
    getSelectedSetlist,
    isLoading,
    shouldShowNoResultsMessage,
  };
}
