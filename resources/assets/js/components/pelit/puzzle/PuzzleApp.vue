<template>
  <div id="puzzle" class="game-container">
    <start-screen
      :resume="resume"
      :disabled="!isSet"
      v-if="gamestate === STATE.start && user.id"
      @resumeGame="resumeGame"
      :title="'Palapeli'"
      @start="startGame"
    >
      <p>
        Kokoa palapeli
        <b v-if="user.nick">{{user.nick}}</b>! Mitä vähemmän siirtoja käytät, sitä paremmin
        sijoitut tilastoissa.
      </p>
      <p v-if="!user.nick">
        <input
          type="text"
          :value="user.nickInput"
          placeholder="Anna nimimerkkisi"
          @input="updateNick"
        >
      </p>
    </start-screen>
    <puzzle-level v-else-if="gamestate === STATE.playing"/>
    <div class="level-finished" v-else-if="gamestate === STATE.finished">
      <taho-modal
        :hasNext="puzzle.hasNext"
        @oncontinue="startLevel(puzzle.id+1)"
        @onrestart="startLevel(puzzle.id)"
      >
        <p v-if="!puzzle.hasNext">
          <b>Pelasit pelin läpi!</b>
        </p>
        <p>
          Käytit siirtoja:
          <b>{{siirrot}}</b>
        </p>
        <p>
          Aikaa kului:
          <b>{{time}} s.</b>
        </p>
        <p v-if="position">
          Pääsit sijalle
          <b>{{position}}.</b>
        </p>
        <p v-else>Et yltänyt TOP 5:een.</p>
      </taho-modal>
      <puzzle-level :readonly="true"/>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {
  StartScreen,
  TahoSpinner,
  TahoButton,
  TahoModal
} from "./../../common";
import PuzzleLevel from "./PuzzleLevel";
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
    user() {
      return this.$store.getters["user/user"];
    },
    isSet() {
      return this.$store.getters["user/isSet"];
    },
    time() {
      return this.$store.getters["common/time"];
    },

    gamestate() {
      return this.$store.getters["common/gamestate"];
    },
    ...mapGetters(["siirrot", "resume", "position", "puzzle"])
  },
  methods: {
    ...mapActions([
      "createBoard",
      "insertItem",
      "startGame",
      "resumeGame",
      "startLevel"
    ]),
    updateNick(event) {
      this.$store.dispatch('user/updateNick', event);
    }
  },
  created() {
    this.$store.dispatch("user/retrieveUser");
  }
};
</script>
<style scoped>

</style>

