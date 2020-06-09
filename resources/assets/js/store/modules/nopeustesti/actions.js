import { STATE } from './../../../constaints';
import api from './../../../services/api.service';


const playSound = () => {
  let audio = document.querySelector('audio');
  audio.currentTime = 0.1;
  audio.play();
};
export default {
  async startGame({ commit, dispatch }) {
    commit('clear');
    commit('common/clear', null, { root: true });
    await dispatch('readScores');
    commit('common/setState', STATE.playing, { root: true });
    setTimeout(() => {
      dispatch('common/startTimer', null, { root: true });
      dispatch('startBlinkingTimer');
    }, 1000);
  },

  startBlinkingTimer({ commit, dispatch, getters }) {

    function getRandomInt(buttonCount) {
      return Math.floor(Math.random() * Math.floor(buttonCount));
    }
    function randomLight() {

      const gametimer = setTimeout(() => {
        let lightIndex = -1;
        while (true) {
          const buttons = getters.buttons;
          lightIndex = getRandomInt(buttons.length);
          if (lightIndex !== getters.currentLight) {
            break;
          }
        }
        commit('setCurrentLight', lightIndex);

        commit('addLight', lightIndex);
        playSound();
        randomLight();
      }, getters.speed);
      commit('setGametimer', gametimer);
    }
    randomLight();
  },

  onPress({ getters, dispatch, commit }, index) {
    const presses = getters.presses.slice();
    presses.push(index);
    const lights = getters.lights.slice();
    const someWrong = presses.length > lights.length || presses.some((press, index) => lights[index] !== press);
    if (someWrong) {
      dispatch('endGame')
    } else {
      commit('addPress', index);
      commit('addSpeed');
    }

  },

  async readScores({ commit }) {
    const scores = await api.callGET('/nopeustesti/scores')
    console.log('scores', scores);
    commit('setScores', scores);
  },

  endGame({ commit, getters, dispatch }) {
    function blinking() {
      let light = 0;
      const blinking = setInterval(() => {
        commit('setCurrentLight', light);
        light += 1;
        if (light >= getters.buttons.length) {
          light = 0;
        }
      }, 100);
      commit('setBlinkinginterval', blinking);

    }
    dispatch('saveGame')
    commit('common/clearInterval', null, { root: true });
    commit('clearGametimer');
    commit('common/setState', STATE.finished, { root: true });
    blinking();
    setTimeout(() => commit('toggleShowModal'), 2500);
  },
  saveGame({ rootGetters, getters, commit }) {
    const time = rootGetters['common/time'];
    const points = getters.presses.length;
    const postObject = {
      user_id: rootGetters['user/id'],
      time,
      points
    };
    console.log('save object', postObject);
    const scores = getters.scores;
    const scoreBeforeSave = scores.find((score) => score.user_id === postObject.user_id);
    console.log('before save', scoreBeforeSave);
    if (!scoreBeforeSave || points >= scoreBeforeSave.points || (points === scoreBeforeSave.points && time <= scoreBeforeSave.time)) {
      api.callPOST('/nopeustesti', postObject)
        .then(data => {
          const index = data.findIndex(item => item.user_id === postObject.user_id);
          if (index > -1) {
            const position = index + 1;
            commit('setPosition', position);
          }
        });
    }
  }






};