<template>
<div id="puzzle">
  <start-screen :resume="resume" v-if="gamestate === STATE.start" @resumeGame="resumeGame"  :title="'Palapeli'" @start="startGame">
    <p>Kokoa palapeli! Mitä vähemmän siirtoja käytät, sitä paremmin 
      sijoitut tilastoissa.
    </p>
  </start-screen>
  <puzzle-level  v-else-if="gamestate === STATE.playing" />
  <div  id="level-finished" v-else-if="gamestate === STATE.finished">
    <taho-modal>
      <p>Käytit siirtoja: <b>{{siirrot}}</b></p>
      <p>Aikaa kului: {{time}} s. </p>
    </taho-modal>
    <puzzle-level />
  </div>
 
 
  <!--
  
  <taho-spinner v-if="loading" />
  <div class="game-container"  v-else>
    <h2>Palapeli</h2>
    <b>Siirrot: {{siirrot}}</b>
    <div id="puzzle-board-container" :style="{ paddingBottom: this.height+'%' }">
      <div id="puzzle-board" :style="gridStyle">
        <puzzle-item-container  :index="index"  :key="item.number"   v-for="(item,index) in container">
          <puzzle-item v-if="item.image" :index="index" :key="item.image.number" :item="item.image"></puzzle-item>
        </puzzle-item-container> 
      </div>
    </div>
    </div>
    -->
</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { StartScreen, TahoSpinner, TahoButton, TahoModal } from "./../../common";
import PuzzleLevel from './PuzzleLevel';
import { STATE } from "./../../../constaints";

export default {
  name: "PuzzleApp",
  components: {
    StartScreen,
    PuzzleLevel,
    TahoButton,
    TahoModal
  },

  data() {
    return {
      STATE
    };
  },

  computed: {
    ...mapGetters([
      "gamestate",
      "siirrot",
      "time",
      "resume"
    ]),

  },
  methods: mapActions(['createBoard', 'insertItem', 'startGame', 'resumeGame'])


};
</script>
<style scoped>

#level-finished, #puzzle {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#level-finished {
  width: 100%;
}


</style>

