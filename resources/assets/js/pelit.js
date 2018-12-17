require('./bootstrap');
window.Vue = require('vue');


import PuzzleApp from './components/pelit/puzzle/PuzzleApp';
import store from './store';
import VueRouter from 'vue-router'
import Pelit from './components/pelit/Pelit';
import PelitSelector from './components/pelit/PelitSelector';

window.Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/', component: PelitSelector
  }
    , {
    path: '/palapeli', component: PuzzleApp
  }]
});

new Vue({
  store,
  router,
  render: h => h(Pelit)
}).$mount('#pelit');
