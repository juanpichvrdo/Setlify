import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useTheme } from "vuetify";

const userTheme = useLocalStorage("theme", "dark");
const isDarkMode = ref(userTheme.value === "dark");

export function useThemeToggle() {
  const theme = useTheme();
  theme.global.name.value = userTheme.value;

  const toggleTheme = () => {
    userTheme.value = userTheme.value === "dark" ? "light" : "dark";
    theme.global.name.value = userTheme.value;
    isDarkMode.value = userTheme.value === "dark";
  };

  return {
    isDarkMode,
    toggleTheme,
  };
}
