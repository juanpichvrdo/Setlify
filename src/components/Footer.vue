<template>
  <v-footer class="footer" elevation="10">
    <p>
      Created by
      <a class="text-secondary" href="https://juanpichvrdo.com/" target="_blank"
        >Juan Daniel</a
      >, powered by
      <a
        class="text-secondary"
        href="https://developer.spotify.com/"
        target="_blank"
        >Spotify</a
      >
      and
      <a
        class="text-secondary"
        href="https://api.setlist.fm/docs/1.0/index.html"
        target="_blank"
      >
        setlist.fm.
      </a>
      -
      <a
        class="text-secondary"
        href="https://github.com/juanpichvrdo/Setlify"
        target="_blank"
      >
        Github
      </a>
    </p>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 60px;
  font-size: 14px;
  display: flex;
  justify-content: center;
}

p {
  text-align: center;
}

a {
  font-weight: 600;
}
</style>
