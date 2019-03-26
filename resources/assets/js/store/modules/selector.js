const state = {
  games: [{
    image: 'http://icons.iconarchive.com/icons/icons8/ios7/128/Very-Basic-Puzzle-Filled-icon.png',
    routeLink: 'palapeli',
    title: 'Palapeli'
  }, {
    image: 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Apps-ksudoku-icon.png',
    routeLink: 'sudoku',
    title: 'Sudoku'
  },
  {
    image: 'http://www.ottoojala.com/share/nopeuspeli.png',
    routeLink: 'nopeustesti',
    title: 'Nopeustesti'
  }
  ]
};

const getters = {
  games: state => state.games
}

export default {
  state,
  getters
};