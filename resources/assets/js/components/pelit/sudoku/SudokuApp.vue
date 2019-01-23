<template>
  <div id="sudoku">
    <start-screen :resume="resume" @resumeGame="resumeGame" title="Sudoku" @start="startNewGame" v-if="gamestate === STATE.start">
      <p v-if="user.nick">Terve <b>{{user.nick}}</b>!</p>
      <p>
        Täytä ruudukot siten, että jokaisessa rivissä, sarakkeessa ja 3x3 ruudukossa tulee
        olla numerot 1-9.
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
    <sudoku-level v-else-if="gamestate === STATE.playing"/>
    <div id="level-finished" v-else-if="gamestate === STATE.finished">
      <taho-modal
        :hasNext="true"
        @oncontinue="resumeGame"
        @onrestart="startLevel(level)"
      >
        <p>Pelasit ruudun läpi.</p>
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
      <sudoku-level :readonly="true"/>
    </div>
  </div>
</template>

<script>
import { StartScreen, TahoModal } from "./../../common";
import { mapActions, mapGetters } from "vuex";
import { STATE } from "./../../../constaints";
import SudokuLevel from "./SudokuLevel";

export default {
  name: "SudokuApp",
  components: {
    StartScreen,
    TahoModal,
    SudokuLevel
  },
  data() {
    return {
      STATE
    };
  },

  computed: mapGetters({
    gamestate: "common/gamestate",
    time: "common/time",
    level: "common/level",
    position: "sudoku/position",
    resume: "sudoku/resume",
    user: "user/user"
  }),
  methods: mapActions({
    startNewGame: "sudoku/startNewGame",
    startLevel: "sudoku/startLevel",
    resumeGame: "sudoku/resumeGame",
    updateNick: "user/updateNick"
    
  }),

   created() {
    this.$store.dispatch('user/retrieveUser');
  }
};
</script>
<style scoped>
#level-finished,
#sudoku {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
}

#level-finished {
  width: 100%;
}
</style>
