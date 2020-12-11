module.exports = () => {
  const endgames = {
    rook: [{type: 'r', color: 'w'}],
    queen: [{type: 'q', color: 'w'}],
    pawn: [{type: 'p', color: 'w'}],
    rook_vs_queen: [{type: 'q', color: 'w'}, {type: 'r', color: 'b'}],
    pawn_vs_pawn: [{type: 'p', color: 'w'}, {type: 'p', color: 'b'}],
    two_bishops: [{type: 'b', color: 'w', square: 'light'}, {type: 'b', color: 'w', square: 'dark'}]
  };
  return {
    getEndgame(type) {
      console.log({type});
      return [
        ...endgames[type],
        {type: 'k', color: 'w'},
        {type: 'k', color: 'b'}
      ]
    },
    listEndGames() {
      return Object.keys(endgames).map((name) => name.replace(/_/g, ' '));
    },
    getEndGameByName(name) {
      return this.getEndgame(name.replace(/\s/g, '_'));
    }
  }
}