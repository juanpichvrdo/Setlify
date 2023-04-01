import { ref } from "vue";
import { getSetlistsAPI } from "@/utils/api";

export async function useSetlists() {
  const isLoading = ref(false);

  const getSetlists = async (searchTerm: string) => {
    const params = {
      artistName: searchTerm,
      p: 1,
    };

    isLoading.value = true;
    const data = await getSetlistsAPI(params);
    isLoading.value = false;

    return data;
  };

  return { getSetlists, isLoading };
}
