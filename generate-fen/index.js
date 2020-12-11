const {Chess} = require('chess.js');

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

function getAvailablePositions(chess) {
  const board = chess.board();
  return board.reduce((available, rank, index) => {
    const rankNumber = [...ranks].reverse()[index];
    const availablePositionsInRank = rank
      .map((square, index) => {
        const fileLetter = files[index];
        if (square === null) {
          return `${fileLetter}${rankNumber}`;
        }
        return false;
      })
      .filter(Boolean);
    return [
      ...available,
      ...availablePositionsInRank
    ]
  }, []);
}

function getAvailablePositionsForPiece(chess, piece) {
  if (!piece.square) {
    return getAvailablePositions(chess);
  }
  return getAvailablePositions(chess).filter((square) => chess.square_color(square) === piece.square);
}

module.exports = () => {
  return {
    generateFenWithPiecesInRandomPositions(pieces) {
      const chess = new Chess();
      chess.clear();
      pieces.forEach((piece) => {
        const availablePositions = getAvailablePositionsForPiece(chess, piece);
        const position = randomElement(availablePositions);
        chess.put(piece, position);
      });
      if (!chess.validate_fen(chess.fen()).valid) {
        return this.generateFenWithPiecesInRandomPositions(pieces);
      }
      return chess.fen();
    }
  }  
}