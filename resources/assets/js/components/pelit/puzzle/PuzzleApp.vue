<template>
<div id="puzzle">
  <start-screen :resume="resume" :disabled="!isSet" v-if="gamestate === STATE.start && user.id" @resumeGame="resumeGame"  :title="'Palapeli'" @start="startGame">
    <p>Kokoa palapeli<b v-if="user.nick"> {{user.nick}}</b>! Mitä vähemmän siirtoja käytät, sitä paremmin 
      sijoitut tilastoissa.
    </p>
    <p v-if="!user.nick">
      <input type="text" :value="user.nickInput" placeholder="Anna nimimerkkisi" @input="updateNick" />
    </p>
  </start-screen>
  <puzzle-level  v-else-if="gamestate === STATE.playing" />
  <div  id="level-finished" v-else-if="gamestate === STATE.finished">
    <taho-modal :hasNext="puzzle.hasNext" @oncontinue="startLevel(puzzle.id+1)" @onrestart="startLevel(puzzle.id)" >
      <p v-if="!puzzle.hasNext"><b>Pelasit pelin läpi!</b></p>
      <p>Käytit siirtoja: <b>{{siirrot}}</b></p>
      <p>Aikaa kului: <b>{{time}} s.</b></p>
      <p v-if="position">Pääsit sijalle <b>{{position}}.</b></p>
      <p v-else>Et yltänyt TOP 5:een.</p> 
    </taho-modal>
    <puzzle-level :readonly="true" />
  </div>
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
      "resume",
      "user",
      'position',
      'puzzle',
      'isSet'
    ]),

  },
  methods: mapActions(['createBoard', 'insertItem', 'startGame', 'resumeGame', 'startLevel', 'updateNick', 'retrieveUser']),

  created() {
    this.retrieveUser();
  }


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

