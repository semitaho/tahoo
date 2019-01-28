<template>
  <div id="sudoku-game">
    <div id="sudoku-info-container">
      <div class="title-container">
        <b>Sudoku</b>
        <small>Taso {{level}}</small>
      </div>
      <div>
        <taho-button type="secondary" :disabled="readonly" size="small" @click="resumeGame" text="Sekoita uudelleen" />
    </div>
      <span>{{time}} s</span>
    </div>
    <div id="sudoku-board">
      <sudoku-square
        :readonly="readonly"
        v-for="(item, index) in board"
        :key="index"
        :active="active === index"
        :index="index"
        :item="item"
        @click="handleClick"
      />
      
      <vue-simple-context-menu
        :elementId="menuId"
        :options="options"
        :ref="'vueSimpleContextMenu'"
        @optionClicked="optionClicked"
      ></vue-simple-context-menu>
      
    </div>
  </div>
</template>
<script>
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";

import { mapGetters, mapActions } from "vuex";
import SudokuSquare from "./SudokuSquare";
import { TahoButton } from './../../common';
import VueSimpleContextMenu from "vue-simple-context-menu";

export default {
  name: "SudokuLevel",
  components: {
    SudokuSquare,
    TahoButton,
    VueSimpleContextMenu
  },
  props: {
    readonly: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      active: -1
    };
  },
  computed: {
    options() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, "poista"].map(number => {
        return {
          name: number,
          value: number
        };
      });
    },
    menuId() {
      return "menu-sudoku";
    },
    ...mapGetters({
      board: "sudoku/board",
      time: "common/time",
      level: "common/level"
    })
  },

  methods: {
    ...mapActions({
      changeNumber: "sudoku/onChangeNumber",
      resumeGame: "sudoku/resumeGame"
    }),
    optionClicked(event) {
      const text = event.option.value;
      const index = event.item;
      if (text === "poista") {
        this.changeNumber({ index, text: null });
      } else {
        this.changeNumber({ index, text });
      }
      this.active = -1;
    },

    handleClick(event, item) {
      this.active = item;
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
      const menu = document.getElementById(this.menuId);
      const height = menu.offsetHeight;
      const width = menu.offsetWidth;
      if (height + event.pageY >= window.innerHeight) {
        menu.style.top = event.pageY - height + 2 + "px";
      } else {
        menu.style.top = event.pageY - 2 + "px";
      }
      if (width + event.pageX >= window.innerWidth) {
        menu.style.left = event.pageX - width + 2 + "px";
      } else {
        menu.style.left = event.pageX - 2 + "px";
      }
    }
  }
};
</script>
<style>
#sudoku-game {
  width: 100%;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

#sudoku-board {
  border-collapse: collapse;
  display: grid;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
#sudoku-board > .grid {
  flex: 11%;
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

.vue-simple-context-menu.vue-simple-context-menu--active {
  display: grid;
  border: 1px solid #333;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

.vue-simple-context-menu.vue-simple-context-menu--active li:last-child {
  grid-column: 2/ -1;
}

@media screen and (max-width: 992px) and (min-width: 769px) {
  #sudoku-game {
    width: 80%;
  }
}

@media screen and (max-width: 1200px) and (min-width: 993px) {
  #sudoku-game {
    width: 70%;
  }
}

@media screen and (min-width: 1201px) {
  #sudoku-game {
    width: 60%;
  }
}
</style>

