<template>
  <div class="game-container">
    <div class="info-container">
      <div class="title-container">
        <b>Nopeustesti</b>
      </div>
      <div>
          <b class="points">{{points}}</b>
      </div>
      <nopeustesti-leader :time="time" :points="points" :scores="scores" />
    </div>
    <div class="board-container">
        <nopeustesti-button :light="isLight(index)" :readonly="readonly" :color="button.color" :index="index" :key="index" v-for="(button, index) in buttons"></nopeustesti-button>
     </div>
  </div>
</template>

<script>
import NopeustestiLeader from './NopeustestiLeader';
import NopeustestiButton from './NopeustestiButton';

import { mapGetters } from 'vuex';
export default {
  name: "NopeustestiBoard",
  props: {
    blinkAll: {
      default: false
    },
    readonly: {
      default: false
    }

  },

  components: {
      NopeustestiLeader,
      NopeustestiButton
  },

  computed: mapGetters({
      time: 'common/time',
      lightIndex: 'nopeustesti/currentLight',
      buttons: 'nopeustesti/buttons',
      points: 'nopeustesti/points',
      scores: 'nopeustesti/scores'
  }),

  methods: {
      isLight(index) {
         return this.lightIndex === index;
      }
  }
};
</script>
<style scoped>

.game-container {
  width: 100%;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.board-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    background: yellowgreen;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.board-container > div {
    margin: 1rem;
}

.points {
    font-size: 200%;
}

.info-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: blueviolet;
  color: white;
  padding: 0.5rem;
  font-size: 70%;
}
</style>

