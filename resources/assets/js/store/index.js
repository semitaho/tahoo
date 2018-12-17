import Vue from 'vue';
import Vuex from 'vuex';

import Puzzle from './modules/puzzle';
import Selector from './modules/selector';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    puzzle: Puzzle,
    selector: Selector
  }
});
