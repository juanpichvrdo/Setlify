<template>
  <v-card>
    <v-list lines="three">
      <template v-for="(setlist, i) in setlists" :key="setlist.id">
        <v-list-item
          :to="{ name: 'Setlist', params: { setlistId: setlist.id } }"
          :value="setlist"
          active-color="primary"
        >
          <v-list-item-title>
            <strong>
              {{ setlist.artist.name }}
            </strong>
          </v-list-item-title>

          <v-list-item-title>
            {{ setlist.venue.name }}, {{ setlist.venue.city.name }},
            {{ setlist.venue.city.country.code }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ setlist.eventDate }}
            <v-icon icon="mdi-circle-small"></v-icon>

            {{ setlist.set?.length || 0 }} Songs
          </v-list-item-subtitle>

          <v-list-item-subtitle v-if="setlist.info" class="mt-2">
            {{ setlist.info }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-divider v-if="i !== setlists.length - 1" />
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { SetlistsFormatted } from "@/utils/types";

defineProps<{
  setlists: SetlistsFormatted[];
}>();
</script>

<style scoped></style>
