export default {
  setCurrentLight: (state, index) => {
    state.currentLight = index;
  },

  clear: (state) => {
    state.lights = [];
    state.presses = [];
    state.position = null;
    state.currentLight = -1;
    state.showModal = false;
    if (state.blinkinginterval){
      clearInterval(state.blinkinginterval);
      state.blinkinginterval = null;
    }
  },

  toggleShowModal: (state) => {
    state.showModal = !state.showModal;

  },

  setScores: (state, scores) => {
    state.scores = scores;
  },

  setPosition: (state, position) => {
    state.position = position;
  }, 

  setGametimer: (state, timer) => {
    state.gametimer = timer;
  },

  setBlinkinginterval: (state, timer) => {
    state.blinkinginterval = timer;
  },

  clearGametimer: (state) => {
    if (state.gametimer) {
      console.log('oolos');
      clearInterval(state.gametimer);
      state.gametimer = null;
    }
  },

  addLight: (state, lightIndex) => {
    state.lights.push(lightIndex);
  },


  addPress: (state, pressIndex) => {
    state.presses.push(pressIndex);
  },

  addSpeed: (state) => {
    state.speed -= state.decrement;
  }
}