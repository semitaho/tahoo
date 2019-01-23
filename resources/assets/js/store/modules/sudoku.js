import { STATE, LEVEL_PUZZLE_KEY } from './../../constaints';
import { fillBoard, createBoard } from './../../sudoku-helper';
import api from './../../services/api.service';

const state = {
    board: [],
    position: null,
    selectedGrid: 2
};

const getters = {

    gamestate: state => {
        return state.gamestate;
    },
    board: state => state.board,
    position: state => state.position,
    time: state => state.time,
    resume: state => !!localStorage.getItem(LEVEL_PUZZLE_KEY),
    selected: state => state.selectedGrid,

    valid: state => state.board.every((item) => item.solution === item.value)
};

const mutations = {
    setBoard(state, board) {
        state.board = board;
    },
    clear(state) {
        state.board = [];
    },

    setPosition(state, position) {
        state.position = position;
    }
};

const actions = {

    startNewGame({ dispatch }) {
        dispatch('startLevel', 1);
    },

    startLevel({ commit, dispatch }, level) {
        console.log('new level', level)
        commit('clear');
        commit('common/clear', null, { root: true });
        commit('common/setLevel', level, { root: true });
        dispatch('createBoard');
        dispatch('common/startTimer', null, { root: true });
        commit('common/setState', STATE.playing, { root: true });
    },

    resumeGame({ dispatch, rootGetters }){
        const level =  localStorage.getItem(LEVEL_PUZZLE_KEY);
        if (rootGetters['user/nickInput']){
            dispatch('user/storeNick', null, { root: true });
          }
        if (level){
          dispatch('startLevel', level);
        }
    
      },

    createBoard({ getters, commit, rootGetters }) {
        const level = rootGetters['common/level'];
        console.log('levl', level);
        let slicedBoard = getters.board.slice();
        slicedBoard = fillBoard(slicedBoard, 0);
        let puzzleBoard = createBoard(slicedBoard, level);
        const gameBoard = puzzleBoard.map((item, index) => {
            const newItem = Object.assign({}, {
                solution: slicedBoard[index],
                readonly: !!item,
                value: item
            });;
            return newItem;
        });
        console.log('board', gameBoard);
        commit('setBoard', gameBoard);
    },

    onChangeNumber({ getters, commit, dispatch }, { index, text }) {
        let boardCopy = getters.board.slice();
        boardCopy[index].value = text;
        commit('setBoard', boardCopy);
        if (getters.valid) {
            console.log('valmis toni!');
            commit('common/clearInterval', null, { root: true });
            setTimeout(() => {
                dispatch('finishLevel');
            }, 1500);
        }
    },

    finishLevel({ dispatch, commit }) {
       dispatch('saveGame');  
       commit('common/setState', STATE.finished, { root: true });
    },

    saveGame({ rootGetters, commit }){
        const currentLevel = rootGetters['common/level'];
        localStorage.setItem(LEVEL_PUZZLE_KEY, +currentLevel+1);
        const postObject = { 
            user_id: rootGetters['user/id'], 
            level: currentLevel,
            time: rootGetters['common/time']
          };
          console.log(' saving', postObject);
          api.callPOST('/sudoku',postObject)
          .then(data => {
            const index = data.findIndex(item => item.user_id === postObject.user_id && item.puzzle_id === postObject.puzzle_id && item.score == postObject.score && item.time === postObject.time);
            if (index > -1){
              const position = index+1;
              commit('setPosition', position);
            }
          });
         
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};