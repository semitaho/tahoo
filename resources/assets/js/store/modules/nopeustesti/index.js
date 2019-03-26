import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { NOPEUSTESTI_SPEED } from '../../../constaints';

const state = {
    gametimer: null,
    position: null,
    blinkinginterval: null,
    showModal: false,
    speed: NOPEUSTESTI_SPEED,
    decrement: 5,
    lights: [],
    presses: [],
    scores: [],
    currentLight: -1,
    currentPressed: -1,
    buttons: [{
        color: 'red'
    }, {
        color: 'blue'
    }, {
        color: 'yellow'
    }, {
        color: 'green'
    }],
    blinkingTimer: null

};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};