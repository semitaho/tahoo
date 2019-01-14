<template>
  <v-select
    :value="item.value"
    :disabled="item.readonly || readonly"
    :tabindex="index"
    :options="options"
    :class="getBoxStyle"
    :selectOnTab="true"
    @input="onChange"
  ></v-select>
</template>

<script>
import vSelect from "vue-select";
import { mapActions } from "vuex";
export default {
  name: "SudokuSquare",
  data() {
    return {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
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
      return style;
    }
  },
  components: { vSelect },
  props: ["index", "item", "readonly"],
  methods: {
    onChange(text) {
      this.changeNumber({ index: this.index, text: +text });
    },

    ...mapActions({
      changeNumber: "sudoku/onChangeNumber"
    })
  }
};
</script>

<style>
select {
  text-align: center;
}

.v-select .open-indicator {
  display: none;
}
.v-select .dropdown-menu {
  min-width: auto;
  left: auto;
  text-align: center;
}

.v-select .selected-tag input {
  justify-content: center;
  font-weight: bold;
}

.v-select .vs__selected-options {
  justify-content: center;
}

.v-select .vs__selected-options .selected-tag {
  flex-grow: 1;
  justify-content: center;
}

.disabled .vs__selected-options .selected-tag {
  font-weight: bold;
  color: #000;
}

.vs__selected-options .selected-tag {
  color: blue;
  font-weight: bold;
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
