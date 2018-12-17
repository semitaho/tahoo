const state = {
  games: [{
    image: 'http://icons.iconarchive.com/icons/icons8/ios7/128/Very-Basic-Puzzle-Filled-icon.png',
    routeLink: 'palapeli',
    title: 'Palapeli'
  }]
};

const getters = {
  games: state => state.games
}

export default {
  state,
  getters
};