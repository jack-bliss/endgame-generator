const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = () => {
  return {
    ask: async (question) => {
      return new Promise((resolve) => {
        rl.question(`${question}\n`, (answer) => {
          resolve(answer);
        })
      });
    },
    end: () => {
      rl.close();
    }
  }
}