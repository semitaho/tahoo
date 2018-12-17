<template>
 
 <taho-spinner v-if="loading" />
 <div v-else id="puzzle-game">
     <div id="puzzle-info-container">
       <div class="title-container">
       <b>Palapeli</b>
       <small>Taso {{level}}</small>
       </div>
        <b>Siirrot: {{siirrot}}</b>
        <span>{{time}} s</span>
     </div>
    <div id="puzzle-board-container" :style="{ paddingBottom: this.height+'%' }">
      <div id="puzzle-board" :style="gridStyle">
        <puzzle-item-container  :index="index"  :key="item.number"   v-for="(item,index) in container">
          <puzzle-item v-if="item.image" :index="index" :key="item.image.number" :item="item.image"></puzzle-item>
        </puzzle-item-container> 
      </div>
    </div>
  </div>
  
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { TahoSpinner } from "./../../common";
import PuzzleItemContainer from "./PuzzleItemContainer";
import PuzzleItem from "./PuzzleItem";

export default {
  name: "PuzzleLevel",
  components: {
    TahoSpinner,
    PuzzleItem,
    PuzzleItemContainer
  },

  computed: {
    ...mapGetters(["loading", "siirrot", "puzzle", "container", "height", "level", "time"]),

    gridStyle() {
      const { cols, rows } = this.puzzle;
      return {
        gridTemplateColumns: "repeat(" + cols + ", 1fr)",
        gridTemplateRows: "repeat(" + rows + ", 1fr)",
        width: "100%"
      };
    }
  },
};
</script>
<style scoped>
#puzzle-game {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#puzzle-info-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: blueviolet;
  color: white;
  padding: .5rem;
}

#puzzle-board-container {
  position: relative;
  width: 100%;
}
#puzzle-board {
  position: absolute;
  display: grid;
  height: 100%;
  justify-content: center;
  grid-gap: 2px;
  border: 2px solid darkmagenta;
  box-sizing: border-box;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>

