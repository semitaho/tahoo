import { STATE, LSKEY_LEVEL } from './../../constaints';
import { fillBoard, createBoard } from './../../sudoku-helper';

const state = {
    board: []
};

const getters = {

    gamestate: state => {
        return state.gamestate;
    },
    board: state => state.board,
    time: state => state.time,
    valid: state => state.board.every((item) => item.solution === item.value)
};

const mutations = {
    setBoard(state, board) {
        state.board = board;
    }
};

const actions = {

    startNewGame({ dispatch }) {
        dispatch('startLevel', 1);
    },

    startLevel({ commit, dispatch }, level) {
        console.log('new level')
        commit('common/setLevel', level, { root: true });
        dispatch('createBoard', level);
        dispatch('common/startTimer', null, { root: true });
        commit('common/setState', STATE.playing, { root: true });
    },

    createBoard({ getters, commit }, level) {
        console.log('level', level);
        let slicedBoard = getters.board.slice();
        slicedBoard = fillBoard(slicedBoard, 0);
        let puzzleBoard = createBoard(slicedBoard, 1);
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

    finishLevel({ commit }) {
       commit('setState', STATE.finished, { root: true });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};