require('dotenv').config();

const axios = require('axios');
const _ = require('lodash');
const token = process.env.LICHESS_TOKEN;

const ChallengeAi = require('./challenge-ai');
const GenerateFen = require('./generate-fen');
const Endgames = require('./endgames');
const Prompt = require('./prompt');

const lichessApi = axios.create({
  baseURL: 'https://lichess.org/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const challengeAi = ChallengeAi(lichessApi);
const generateFen = GenerateFen();
const endgames = Endgames();
const prompt = Prompt();

async function main() {
  try {
    const endgameNames = endgames.listEndGames();
    endgameNames.forEach((name, index) => {
      console.log(`${index}: ${name}`);
    });
    const choseEndgameName = await prompt.ask('enter number for endgame to generate');
    prompt.end();
    const endgame = endgames.getEndGameByName(endgameNames[choseEndgameName]);
    const fen = generateFen.generateFenWithPiecesInRandomPositions(endgame);
    const {data} = await challengeAi(fen);
    console.log(JSON.stringify(data), null, 2);
  } catch (error) {
    console.error(_.get(error, ['response', 'data'], error.toString()));
  }
}

main();