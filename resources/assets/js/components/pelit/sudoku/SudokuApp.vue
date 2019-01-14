<template>
  <div id="sudoku">
    <start-screen title="Sudoku" @start="startNewGame" v-if="gamestate === STATE.start">
      <p>
        Täytä ruudukot siten, että jokaisessa rivissä, sarakkeessa ja 3x3 ruudukossa tulee
        olla numerot 1-9.
      </p>
    </start-screen>
    <sudoku-level v-else-if="gamestate === STATE.playing"/>
    <div id="level-finished" v-else-if="gamestate === STATE.finished">
      <taho-modal
        :hasNext="true"
        @oncontinue="startLevel(puzzle.id+1)"
        @onrestart="startLevel(puzzle.id)"
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
    time: "common/time"
  }),
  methods: mapActions({
    startNewGame: "sudoku/startNewGame",
    startLevel: "sudoku/startLevel"
  })
};
</script>
<style scoped>
#level-finished,
#sudoku {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#level-finished {
  width: 100%;
}
</style>
