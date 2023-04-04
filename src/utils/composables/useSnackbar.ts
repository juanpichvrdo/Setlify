import { ref } from "vue";

const shouldOpenSnackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("");

export function useSnackbar() {
  const displaySnackbar = (message: string, color: string) => {
    shouldOpenSnackbar.value = true;
    snackbarMessage.value = message;
    snackbarColor.value = color;
  };

  return {
    shouldOpenSnackbar,
    displaySnackbar,
    snackbarMessage,
    snackbarColor,
  };
}
