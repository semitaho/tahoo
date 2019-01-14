<template>
  <div id="sudoku-game">
    <div id="sudoku-info-container">
      <div class="title-container">
        <b>Sudoku</b>
        <small>Taso {{level}}</small>
      </div>
      <span>{{time}} s</span>
    </div>
    <div id="sudoku-board">
        <sudoku-square :readonly="readonly" v-for="(item, index) in board" :key="index" :index="index" :item="item"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import SudokuSquare from './SudokuSquare';
export default {
  name: "SudokuLevel",
  components: {
      SudokuSquare
  },
  props:{
      readonly: {
          default: false,
          type: Boolean
      }
  },
  computed: mapGetters({
      board: 'sudoku/board',
      time: 'common/time',
      level: 'common/level'
  })
};
</script>
<style scoped>

#sudoku-game {
    width: 100%;
}

#sudoku-board {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(9, 1fr);

}
#sudoku-info-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: blueviolet;
  color: white;
  padding: 0.5rem;
  font-size: 70%;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


@media screen and (max-width: 992px) and (min-width: 769px) {
    #sudoku-game {
        width: 90%;
    }
}

@media screen and (max-width: 1200px) and (min-width: 993px)  {
    #sudoku-game {
        width: 80%;
    }
}

@media screen and (min-width: 1201px) {
    #sudoku-game {
        width: 70%;
    }
}


</style>

