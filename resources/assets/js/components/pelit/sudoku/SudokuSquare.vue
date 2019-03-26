<template>
  <div class="grid" :class="getBoxStyle" @click.prevent.stop="handleClick">
    <span>{{item.value}}</span>
  </div>
</template>

<script>
const DIFFCOLOR_BOXAREAS = [0, 6, 30, 54, 60];

const boxes = DIFFCOLOR_BOXAREAS.reduce((acc, current) => {
  for (let i = current; i < current + 3; i++) {
    for (let j = 0; j <= 2; j++) {
      const index = i + (j * 9) ;
      acc.push(index);
    }
  }
  return acc;
}, []);


import { mapActions } from "vuex";
export default {
  name: "SudokuSquare",
  computed: {
    getBoxStyle() {
      let style = "box-cell ";
      if ((this.index + 1) % 3 === 0) {
        style += "box-right ";
      }
      if (this.index % 9 === 0) {
        style += "box-left ";
      }
      if (this.index < 9) {
        style += "box-top ";
      }
      if (
        (18 <= this.index && this.index <= 26) ||
        (45 <= this.index && this.index <= 53) ||
        72 <= this.index
      ) {
        style += "box-bottom";
      }
      if (!this.item.readonly && !this.readonly) {
        style += " editable";
      }
      if (this.active) {
        style += " active";
      }

      if (boxes.indexOf(this.index) > -1) {
        style += " gray";
      }
      return style;
    }
  },
  props: ["index", "item", "readonly", "active"],
  methods: {
    onChange(text) {
      if (text === this.item.value) {
        return;
      }
      this.changeNumber({ index: this.index, text: +text });
    },

    handleClick(event) {
      if (this.item.readonly || this.readonly) {
        return;
      }
      this.$emit("click", event, this.index);
    },

    ...mapActions({
      changeNumber: "sudoku/onChangeNumber"
    })
  }
};
</script>

<style>
.grid {
  border-right: 1px solid #119595;
  border-bottom: 1px solid #119595;
  background: white;
  padding: .3rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid span {
  font-weight: bold;
}

.grid.gray {
  background: #f2f2f2;
}

.grid.editable {
  color: blue;
}

.grid.editable:hover,
.grid.editable.active {
  cursor: pointer;
  border: .3rem solid #119595;
}

.box-left {
  border-left: 2px solid black;
}

.box-top {
  border-top: 2px solid black;
}

.box-right {
  border-right: 2px solid black;
}

.box-bottom {
  border-bottom: 2px solid black;
}
</style>
