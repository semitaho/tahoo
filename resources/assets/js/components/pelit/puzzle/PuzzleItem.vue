<template>
  <div  @dragover.prevent="dragOver" @dragend="endDrag" @dragstart="onDragStart" draggable="true" class="puzzle-item" :id="'img_'+this.item.number" :style="itemStyle">
  </div>
  
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PuzzleItem",

  props: ["item", "index"],

  computed: {
    ...mapGetters(["puzzle"]),

    itemStyle() {
      const { rows, cols, image } = this.puzzle;
      return {
      
        backgroundSize: (cols*100)+'% '+(rows*100)+'%',
        backgroundImage: 'url("' + image + '")',
        backgroundPosition: this.item.x + "% " + this.item.y + "%"
      };
    }
  },

  methods: {
    dragOver(event){
      console.log('on drag over');
      event.target.style.zIndex = 99999;

    },
    endDrag(event) {
      if (event.dataTransfer.dropEffect === "none") {
        this.$store.dispatch("cancelDrag", this.index);
      }
    },

    onDragStart(event) {
      event.stopPropagation();
   
      event.dataTransfer.setData("source", this.index);
      this.$store.dispatch("takeItem", this.index);
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



