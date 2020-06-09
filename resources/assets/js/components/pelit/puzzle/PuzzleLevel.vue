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
        <puzzle-item-container :readonly="readonly" :item="item" :index="index"  :key="puzzle.id+'_'+item.number"   v-for="(item,index) in container">
          <puzzle-item  :readonly="readonly" v-if="item.image" :index="index" :key="item.image.number" :item="item.image"></puzzle-item>
        </puzzle-item-container> 
      </div>
    </div>
    <iframe width="420" height="10" 
      src="https://youtube.com/v/PEB1pXNtkZs?&autoplay=1&loop=1">
    </iframe>
    </div>
  
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { TahoSpinner } from "./../../common";
import { PADDING } from './../../../constaints';
import PuzzleItemContainer from "./PuzzleItemContainer";
import PuzzleItem from "./PuzzleItem";

export default {
  name: "PuzzleLevel",
  components: {
    TahoSpinner,
    PuzzleItem,
    PuzzleItemContainer
  },

  props: {
    readonly: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    time() {
      return this.$store.getters['common/time'];

    },

    level() {
      return this.$store.getters['common/level'];
    },
    ...mapGetters(["loading", "siirrot", "puzzle", "container", "height"]),

    gridStyle() {
      const { cols, rows, image } = this.puzzle;
      return {
        width: "100%"
      };
    }
  },
};
</script>
<style scoped>


#puzzle-info-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: blueviolet;
  color: white;
  padding: .5rem;
  font-size: 70%;
}

#puzzle-board-container {
  width: 100%;
  height: 100%;
  position: relative;
}
#puzzle-board {
  position: absolute;
  align-content: stretch;
  height: 100%;
  grid-gap: 2px;
  border: 4px solid #333;
  box-sizing: border-box;
  padding-bottom: 0 !important;
  bottom: 0 !important;
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

