<template>
  <div class="leader-container">
    <b><span v-if="position">{{position}}. </span> {{user.nick}} {{time}} s</b>
    <div class="nick-container" :class="{active: showItem(score)}" v-for="(score,index) of scores" :key="index" 
    >
     <span>{{position ? index+ 2 : index+1}}. {{score.nick}} {{score.time}} s </span>  
    </div>
  </div>
</template>
<script>
import { countCurrentPosition } from './../../../sudoku-helper.js';
export default {

  name: "SudokuLeader",
  props: ['time', 'scores', "user",  "position"],
  methods: {
    showItem(score) {
      const scores = this.scores;
      const found = scores.find((scoreFound) => this.time <= scoreFound.time);
      if (!found) {
        return false;
      }
      return found.ip === score.ip && found.time === score.time && score.nick === found.nick;
    }
  }
};
</script>

<style scoped>
.leader-container {
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: flex-end;
}
.nick-container {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.nick-container.active {
  display: flex;
  height: auto;
  justify-content: space-between;
  transition: all 0.4s ease-out;
  visibility: visible;
  opacity: 1;
}
</style>
