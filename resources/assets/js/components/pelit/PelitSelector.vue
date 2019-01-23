<template>
<div class="game-page">
  <h1>Valitse peli</h1>
  
  <div class="game-selector-container">
    <router-link class="game-selector" :to="peli.routeLink"  :key="peli.routeLink" v-for="peli in games">
      <img :src="peli.image" />
      <b>{{peli.title}}</b>
    </router-link>
  </div>
  <div>
    <div><b>Tulossa:</b></div>
    <div><span>Nopeustesti</span></div>
  </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "PelitSelector",
  computed: mapGetters(["games"])
};
</script>
<style scoped>
  .game-selector-container {
    display: flex;
    justify-content: center;
  }

  .game-page {
    flex-direction: column;
    flex: 1;
    justify-content: center;
    display: flex;
  }
  .game-page > * {
    margin-bottom: 2rem;
  }

  .game-selector {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
  }
</style>


