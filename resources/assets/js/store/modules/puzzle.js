
import api from './../../services/api.service';
import { STATE } from './../../constaints';
const shuffle = imageArr => {
  for (let i = imageArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageArr[i], imageArr[j]] = [imageArr[j], imageArr[i]];
  }
  return imageArr;
}

let interval;
const state = {
  container: [],
  fly: null,
  width: 0,
  height: 0,
  siirrot: 0,
  imageIndex: 0,
  time: 0,
  interval : null,
  gamestate: STATE.start,
  level: null,
  image: null,
  loading: true
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
  resume: () => {
    return true;

  },
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
    state.container = payload.slice();
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

  setLevel(state, num) {
    state.level = num;
  },

  setInterval(state, interval){
    state.interval = interval;
  },

  clearInterval(state) {
    clearInterval(state.interval);
  },

  addTime(state, time) {
    state.time += 1;
  },

  setState(state, gamestate) {
    state.gamestate = gamestate;
  }

};

const actions = {

  createBoard({ commit, getters }) {
    console.log('creating board...');
    api.callGET('/puzzles/'+getters.level)
      .then((data) => {
        const { image, width, rows, cols } = data;
        commit('setPuzzle', data);
        let img = new Image();
        img.src = image;
        img.onload = () => {
          const heightRatio = img.height / img.width;
          console.log('ratio', heightRatio * 100);
          commit('setHeight', heightRatio * 100);
          let imageNumber = 1;
          let puzzleObjects = [];
          let images = [];
          for (let rowPos = 0; rowPos < rows; rowPos += 1) {
            for (let colPos = 0; colPos < cols; colPos += 1) {
              const puzzleObject = {
                number: imageNumber
              };
              const image = {
                number: imageNumber,
                x: (colPos * (100 / (cols - 1))),
                y: (rowPos * (100 / (rows - 1)))
              }
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

        }
      });

  },

  cancelDrag({ commit, state }, index) {
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
    console.log('siirrot', state.siirrot);
    if (getters.isValid) {
      setTimeout(() => { 
        dispatch('finishLevel');
      }
        , 500);
    }

  },

  finishLevel({commit, dispatch }) {
    clearInterval(interval);
    dispatch('saveGame');
    commit('setState', STATE.finished);
  },

  takeItem({ commit, state }, index) {
    const containerCopy = state.container.slice();
    commit('setFly', containerCopy[index].image);
    containerCopy[index].image = null;
    commit('setContainer', containerCopy);
  },

  saveGame({commit, getters, dispatch}) {
    const saveObject ={
      level: getters.level+1
    };
    //sessionStorage.saveGame(JSON.stringify(saveObject)); 

  },

  startGame({ commit, dispatch }) {
    commit('setLoading', true);
    commit('setLevel', 1);    
    dispatch('createBoard');
    commit('setState', STATE.playing);
     interval = setInterval(() => {
      commit('addTime', 1);
    },1000);
  }
};

export default {
  state,
  getters,
  mutations,
  actions

};