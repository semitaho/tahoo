import api from './../../services/api.service';
import { STATE, LSKEY_LEVEL } from './../../constaints';
const shuffle = imageArr => {
  for (let i = imageArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageArr[i], imageArr[j]] = [imageArr[j], imageArr[i]];
  }
  return imageArr;
}

const state = {
  container: [],
  fly: null,
  width: 0,
  height: 0,
  siirrot: 0,
  imageIndex: 0,
  puzzle: null,
  image: null,
  position: null,
  loading: true,
  placed: false
};

const getters = {
  width: state => state.width,
  height: state => state.height,
  container: state => state.container,
  stackObjects: state => state.items,
  puzzle: state => state.puzzle,
  siirrot: state => state.siirrot,
  loading: state => state.loading,
  gamestate: state => state.gamestate,
  time: state => state.time,
  level: state => state.level,
  position: state => state.position,
  placed: state => state.placed,
  resume: state => !!localStorage.getItem(LSKEY_LEVEL),
  isValid: state => {
    return state.container.every(containerItem => containerItem.number === containerItem.image.number);
  }
};

const mutations = {

  setWidth(state, number) {
    state.width = number;
  },

  setLoading(state, val) {
    state.loading = val;
  },

  setHeight(state, number) {
    state.height = number;
  },

  setContainer(state, payload) {
    state.container = payload;
  },

  setFly(state, image) {
    state.fly = image;
  },

  addSiirto(state) {
    state.siirrot = state.siirrot + 1;
  },

  setPuzzle(state, image) {
    state.puzzle = image;
  },

  setPosition(state, position) {
    state.position = position;
  },

  setPlaced(state, placed) {
    state.placed = placed;
  },

  clear(state) {
    state.siirrot = 0;
    state.height = 0;
    state.imageIndex = 0;
    state.position = null;
    state.container = [];
  }

};

const actions = {

  createBoard({ commit, rootGetters }) {
    console.log('creating board...');
    Promise.all([api.callGET('/puzzles/' + rootGetters['common/level'])])
      .then(([data]) =>  {
        const { image, rows, cols } = data;
        commit('setPuzzle', data);
        let img = new Image();
        img.src = image;
        img.onload = () => {
          const heightRatio = img.height / img.width;
          commit('setHeight', heightRatio * 100);
          let imageNumber = 1;
          let puzzleObjects = [];
          let images = [];
          for (let rowPos = 0; rowPos < rows; rowPos += 1) {
            for (let colPos = 0; colPos < cols; colPos += 1) {
              const puzzleObject = {
                number: imageNumber,
                row: rowPos,
                rows,
                col: colPos,
                cols
              };
              const image = {
                number: imageNumber,
                x: (colPos * (100 / (cols - 1))),
                y: (rowPos * (100 / (rows - 1)))
              };            
              puzzleObjects.push(puzzleObject);
              images.push(image);
              imageNumber++;
            }
          }
          const shuffledImages = shuffle(images);
          puzzleObjects.forEach((item, index) => {
            item.image = shuffledImages[index];
          });         
          commit('setContainer', puzzleObjects); 
          commit('setLoading', false);

        };
      });

  },

  cancelDrag({ commit, state }, index) {
    console.log('sänseling...');
    const newContainer = state.container.slice();
    newContainer[index].image = state.fly;
    commit('setContainer', newContainer);
    commit('setFly', null);
  },

  insertItem({ commit, state, getters, dispatch }, { source, target }) {
    const newContainer = state.container.slice();
    newContainer[source].image = newContainer[target].image;
    newContainer[target].image = state.fly;
    commit('setContainer', newContainer);
    commit('setFly', null);
    commit('addSiirto');
    if (getters.isValid) {
      setTimeout(() => {
        dispatch('finishLevel');
      }, 1500);
    }

  },

  swap({ commit, getters, dispatch }, {source, target}){
    const newContainer = state.container.slice();
    const swappable = newContainer[source].image; 
    newContainer[source].image = newContainer[target].image;
    newContainer[target].image = swappable;
    commit('setContainer', newContainer);
    commit('addSiirto');
    if (getters.isValid) {
      setTimeout(() => {
        dispatch('finishLevel');
      }, 1500);
    }

  },

  finishLevel({ commit, dispatch }) {
    commit('common/clearInterval', null, { root: true });
    dispatch('saveGame');
    commit('setState', STATE.finished);
  },

  takeItem({ commit, state }, index) {
    const containerCopy = state.container.slice();
    commit('setFly', containerCopy[index].image);
    containerCopy[index].image = null;
    commit('setContainer', containerCopy);
  },

  resumeGame({ dispatch, rootGetters }, index){
    if (rootGetters['user/nickInput']){
      dispatch('user/storeNick', null, { root: true });
    }
    const level =  localStorage.getItem('level');
    if (level){
      dispatch('startLevel', level);
    }

  },

  saveGame({ commit, getters, rootGetters }) {
    const postObject = { 
      user_id: rootGetters['user/id'], 
      puzzle_id: getters.puzzle.id,
      score: getters.siirrot,
      time: rootGetters['common/time']
    };
    console.log(' saving', postObject);
    api.callPOST('/puzzles/scores',postObject)
      .then(data => {
        const index = data.findIndex(item => item.user_id === postObject.user_id && item.puzzle_id === postObject.puzzle_id && item.score == postObject.score && item.time === postObject.time);
        if (index > -1){
          const position = index+1;
          commit('setPosition', position);
        }
      });
      if (getters.puzzle.hasNext){
        localStorage.setItem('level', getters.puzzle.id+1);
      }
  },

  startLevel({ commit, dispatch }, level){
    commit('clear');
    commit('common/clear', null, { root: true });
    commit('common/setState', STATE.playing, { root: true });
    commit('setLoading', true);
    commit('common/setLevel', level, { root: true });
    dispatch('createBoard');
    dispatch('common/startTimer', null, { root: true });
  },
  startGame({ commit, dispatch, rootGetters }) {
    localStorage.removeItem(LSKEY_LEVEL);
    dispatch('startLevel', 1);
    if (rootGetters['user/nickInput']){
      dispatch('user/storeNick', null, { root: true });
    }
    
  }
};

export default {
  state,
  getters,
  mutations,
  actions

};