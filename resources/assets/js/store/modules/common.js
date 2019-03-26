import { STATE } from './../../constaints';

const state = {
    gamestate: STATE.start,
    interval: null,
    time: 0,
    level: null

};

const mutations = {
    addTime: state => state.time += 1,
    setLevel: (state, level) => state.level = level,
    clearInterval(state, interval) {
        clearInterval(state.interval);
    },

    clear(state) {
        clearInterval(state.interval);
        state.time = 0;
    },

    setState: (state, gamestate) => {
        console.log('gamestate', gamestate);
        state.gamestate = gamestate;
    }
};

const getters = {
    time: state => state.time,
    gamestate: state => state.gamestate,
    level: state => state.level
};

const actions = {
    startTimer({ state, commit }) {
        state.interval = setInterval(() => {
            commit('addTime', 1);
        }, 1000)
    },
    finishLevel(){

    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions

}