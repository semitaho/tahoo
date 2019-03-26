import Vue from 'vue';
import Vuex from 'vuex';

import Puzzle from './modules/puzzle';
import Sudoku from './modules/sudoku';
import NopeuspeliModule from './modules/nopeustesti/index';

import Selector from './modules/selector';
import User from './modules/user';
import Common from './modules/common';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common: Common,
    puzzle: Puzzle,
    sudoku: Sudoku,
    nopeustesti: NopeuspeliModule,
    selector: Selector,
    user: User
  }
});
