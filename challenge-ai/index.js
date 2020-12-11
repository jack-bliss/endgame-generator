module.exports = (lichessApi) => {
  return async (fen, level = 8) => {
    return lichessApi.post('challenge/ai', {
      level,
      fen
    });
  }
}