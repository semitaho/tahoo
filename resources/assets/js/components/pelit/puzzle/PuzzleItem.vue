<template>
  <div
    @dragover.prevent="dragOver"
    @drop.prevent="placeItem"
    @touchstart.prevent="touchStart"
    @touchmove.prevent="touchMove"
    @touchend="touchEnd"
    @dragend.prevent="endDrag"
    @dragstart="onDragStart"
    draggable="true"
    class="puzzle-item"
    :id="'img_'+this.puzzle.id+'_'+this.item.number"
    :style="itemStyle"
  ></div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { PADDING } from "./../../../constaints";
export default {
  name: "PuzzleItem",

  props: ["item", "index", "readonly"],

  computed: {
    ...mapGetters(["puzzle", "placed"]),

    itemStyle() {
      const { rows, cols, image } = this.puzzle;
      return {
        backgroundSize: cols * 100 + "% " + rows * 100 + "%",
        backgroundImage: 'url("' + image + '")',
        backgroundPosition: this.item.x + "% " + this.item.y + "%",
        backgroundRepeat: "no-repeat"
      };
    }
  },

  methods: {
    ...mapActions(["swap"]),
    touchStart(event) {
      if (this.readonly) {
        return false;
      }
      document.documentElement.style.overflow = 'hidden';
      const touch = event.touches[0] || event.changedTouches[0];
      this.startX = touch.pageX;
      this.startY = touch.pageY;
      this.x = touch.target.getBoundingClientRect().left;
      this.y = touch.target.getBoundingClientRect().top;
      touch.target.classList.add("touchmove");
    },

    touchMove(event) {
       if (this.readonly) {
        return false;
      }
      const touch = event.touches[0] || event.changedTouches[0];
      event.target.style.left = touch.pageX - this.startX + "px";
      event.target.style.top = touch.pageY - this.startY + "px";
    },

    touchEnd(event) {
      if (this.readonly) {
        return false;
      }
      document.documentElement.style.overflow = 'auto';
      const touch = event.touches[0] || event.changedTouches[0];
      const currentDisplay = touch.target.style.display;
      touch.target.style.display = "none";
      const targetElement = document.elementFromPoint(touch.pageX, touch.pageY);
      touch.target.style.display = currentDisplay;

      if (!targetElement || targetElement.id.indexOf("img") === -1) {
        this.cancelTouch(touch, currentDisplay);
        return;
      }
      const index = this.getIndex(targetElement);
      this.animateTransfer(targetElement, this.x, this.y, () =>
        this.$store.dispatch("swap", { source: index, target: this.index })
      );
    },

    getIndex(element){
      const id = element.parentNode.id;
      const index = id.substring(id.lastIndexOf('-')+1);
      console.log('index', index);
      return index;

    },

    animateTransfer(targetElement, x, y, callback) {
      targetElement.classList.add("touchunder");
      const ANIMATION_TIME = 300;
      const INTERVAL_TIME = 50;
      const targetLeft = x - targetElement.getBoundingClientRect().left;
      const targetTop = y - targetElement.getBoundingClientRect().top;
      const LEFT_BUMP = (targetLeft / ANIMATION_TIME) * INTERVAL_TIME;
      const TOP_BUMP = (targetTop / ANIMATION_TIME) * INTERVAL_TIME;
      targetElement.style.left = 0;
      targetElement.style.top = 0;

      let currentLeft = 0,
          currentTop = 0,
          totalTime = 0;
      let id = setInterval(() => {
        if (totalTime >= ANIMATION_TIME) {
          clearInterval(id);
          callback();
        }
        targetElement.style.left = currentLeft + "px";
        targetElement.style.top = currentTop + "px";
        (currentLeft += LEFT_BUMP),
          (currentTop += TOP_BUMP),
          (totalTime += INTERVAL_TIME);
      }, INTERVAL_TIME);
    },

    cancelTouch(touch, displayMode) {
      touch.target.style.left = 0;
      touch.target.style.top = 0;
      touch.target.style.display = displayMode;
      touch.target.classList.remove("touchmove");
    },

    dragOver(event) {
      // event.target.style.zIndex = 99999;
    },
    endDrag(event) {
      if (this.readonly) {
        return false;
      }
      if (!this.placed) {
        this.$store.dispatch("cancelDrag", this.index);
      }
    },

    onDragStart(event) {
      if (this.readonly) {
        return false;
      }
      event.stopPropagation();
      const x = event.target.getBoundingClientRect().left;
      const y = event.target.getBoundingClientRect().top;

      this.$store.commit("setPlaced", false);
      console.log("index", this.index);
      const textIndex = this.index.toString();
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("text", textIndex+ '|'+ x + '|' + y);
      this.$store.dispatch("takeItem", textIndex);
    },

    placeItem(event) {
      if (this.readonly) {
        return false;
      }
      console.log("placing item", event.target);
      const [source, x, y] = event.dataTransfer.getData('text').split('|');
      console.log("source", source);
      console.log("x", x);
      console.log("y", y);
      this.$store.commit("setPlaced", true);
      if (+source === +this.index) {
        this.$store.dispatch("cancelDrag", this.index);
        return;
      }
      this.animateTransfer(event.target, x, y, () =>
        this.$store.dispatch("insertItem", { source, target: this.index })
      );
    }
  }
};
</script>
<style scoped>
.puzzle-item {
  padding: 0.3em;
  touch-action: none;
  cursor: grab;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 8997;
}
.touchmove {
  z-index: 8999;
}

.touchunder {
  z-index: 8998;
}

.dragging {
  opacity: 0.1;
  cursor: grabbing;
}
</style>



