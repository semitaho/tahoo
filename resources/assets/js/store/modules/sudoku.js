import { STATE, LEVEL_PUZZLE_KEY, LSKEY_LEVEL } from './../../constaints';
import { fillBoard, createBoard } from './../../sudoku-helper';
import api from './../../services/api.service';

const state = {
    board: [],
    position: null,

    scores: []
};

const getters = {

    gamestate: state => {
        return state.gamestate;
    },
    board: state => state.board,
    position: state => state.position,
    time: state => state.time,
    resume: state => !!localStorage.getItem(LSKEY_LEVEL),
    selected: state => state.selectedGrid,
    scores: state => {
        const scores = state.scores;
        const uniqScores = scores;
        /*
        scores.filter((score,index) => {
           const foundIndex = scores.findIndex((scoreNow) => scoreNow.id ===  score.id);
           return foundIndex === index;
        });
        */
        return uniqScores;

    },

    valid: state => state.board.every((item) => item.solution === item.value)
};

const mutations = {
    setBoard(state, board) {
        state.board = board;
    },
    setScores(state, scores) {
        state.scores = scores;
    },

    clear(state) {
        state.board = [];
        state.scores = [];
        state.position = null;
    },

    setPosition(state, position) {
        state.position = position;
    }
};

const actions = {

    startNewGame({ dispatch }) {
        localStorage.setItem(LSKEY_LEVEL, 1);
        dispatch('startLevel', 1);
    },

    startLevel({ commit, dispatch }, level) {
        commit('clear');
        commit('common/clear', null, { root: true });
        commit('common/setLevel', level, { root: true });
        dispatch('readScores', level);
        dispatch('createBoard');
        dispatch('common/startTimer', null, { root: true });
        commit('common/setState', STATE.playing, { root: true });
    },

    readScores({ commit }, level) {
        api.callGET('/sudoku/scores/' + level)
            .then((scoresLevel) => {
                commit('setScores', scoresLevel);
            });

    },

    resumeGame({ dispatch, rootGetters }) {
        const level = localStorage.getItem(LSKEY_LEVEL);
        if (rootGetters['user/nickInput']) {
            dispatch('user/storeNick', null, { root: true });
        }
        if (level) {
            dispatch('startLevel', level);
        } else {
            dispatch('startLevel', 1);
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

    saveGame({ rootGetters, commit, getters }) {
        const currentLevel = rootGetters['common/level'];
        localStorage.setItem(LSKEY_LEVEL, +currentLevel + 1);
        const time = rootGetters['common/time'];
        const postObject = {
            user_id: rootGetters['user/id'],
            level: currentLevel,
            time
        };
        console.log(' saving', postObject);
        const scores = getters.scores;
        const scoreBeforeSave = scores.find((score) => score.user_id === postObject.user_id && +currentLevel === score.level);
        console.log('before save', scoreBeforeSave);
        if (!scoreBeforeSave || time <= scoreBeforeSave.time) {
            api.callPOST('/sudoku', postObject)
                .then(data => {
                    const index = data.findIndex(item => item.user_id === postObject.user_id && +item.level === +currentLevel);
                    if (index > -1) {
                        const position = index + 1;
                        commit('setPosition', position);
                    }
                });
        } 

    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};