require('./bootstrap');
window.Vue = require('vue');

// options are optional ;)

import VueAnalytics from 'vue-analytics';
import PuzzleApp from './components/pelit/puzzle/PuzzleApp';
import store from './store';
import VueRouter from 'vue-router';
import { GA_KEY } from './constaints';
import Pelit from './components/pelit/Pelit';
import PelitSelector from './components/pelit/PelitSelector';
import dApp from './components/pelit/3d/3dApp';

window.Vue.use(VueRouter);



const router = new VueRouter({
  routes: [{
    path: '/', component: PelitSelector
  }
    , {
    path: '/palapeli', component: PuzzleApp
  },
   {
    path: '/3d', component: dApp
  }
]
});

window.Vue.use(VueAnalytics, {
  id: GA_KEY,
  router
});

new Vue({
  store,
  router,
  render: h => h(Pelit)
}).$mount('#pelit');
