<template>
  <div>
    <v-form @submit.prevent="onSearch">
      <v-text-field
        :loading="isLoading"
        v-model="searchTerm"
        variant="solo"
        label="Search by artist"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onSearch"
      ></v-text-field>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "on-setlist-search", searchTerm: string): void;
}>();

defineProps<{
  isLoading: boolean;
}>();

const searchTerm = ref("");

const onSearch = async () => {
  if (searchTerm.value) {
    emit("on-setlist-search", searchTerm.value);
  }
};
</script>

<style scoped></style>
