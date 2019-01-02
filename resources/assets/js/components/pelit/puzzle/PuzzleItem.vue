<template>
  <div  @dragover.prevent="dragOver"  @dragend.prevent="endDrag" @dragstart="onDragStart" draggable="true" class="puzzle-item" :id="'img_'+this.puzzle.id+'_'+this.item.number" :style="itemStyle">
  </div>
  
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { PADDING } from './../../../constaints';
export default {
  name: "PuzzleItem",

  props: ["item", "index", "readonly"],

  computed: {
    ...mapGetters(["puzzle", 'placed']),

    itemStyle() {
      const { rows, cols, image } = this.puzzle;
      const kerroinX = 1;
      const kerroinY = 100 /  (100  / rows);
      
      return {
        backgroundSize: (cols*100)+'% '+(rows*100)+'%',
        backgroundImage: 'url("' + image + '")',
        backgroundPosition:  this.item.x + "% " + this.item.y + "%",
        backgroundRepeat: 'no-repeat',

      };
    }
  },

  methods: {
    dragOver(event){
     // event.target.style.zIndex = 99999;

    },
    endDrag(event) {
       if (this.readonly){
        return false;
      }
      console.log('eff', this.placed);
      if (!this.placed) {
        this.$store.dispatch("cancelDrag", this.index);
      }
    },

    onDragStart(event) {
      if (this.readonly){
        return false;
      }
      event.stopPropagation();
      this.$store.commit('setPlaced', false);
      console.log('index', this.index);
      const textIndex = this.index.toString();
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData("source",textIndex);
      this.$store.dispatch("takeItem", textIndex);
    }
  }
};
</script>
<style scoped>
.puzzle-item {
  padding: 0.3em;
  cursor: grab;
  height: 100%;
  width: 100%;
}

.dragging {
  opacity: 0.1;
  cursor: grabbing;

}

</style>



