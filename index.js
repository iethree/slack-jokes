const fs = require('fs');
const fetch = require('node-fetch');
const qs = require('querystring');

function getRandomJoke() {
  const jokeList = require('./data/jokes.json');
  const randomIndex = Math.floor(Math.random() * jokeList.length);
  return `${jokeList[randomIndex].setup}\n\n\n${jokeList[randomIndex].punchline}`;
}

async function getRandomLine(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) reject(err);
      else {
        const lines = data.split('\n');
        const line = lines[Math.floor(Math.random() * lines.length)];
        resolve(line);
      }
    });
  });
}

async function getPatrickJoke(name = 'Patrick') {
  const joke = await getRandomLine('./data/facts.txt')
    .catch(console.error);

  if (!joke) {
    return Promise.reject('Error getting joke');
  }

  const jokeToSend = joke.replace(/Jeff Dean|Jeff/ig, name);

  return jokeToSend;
}

async function getChuckJoke(name = 'Chuck Norris') {
  const joke = await fetch('https://api.chucknorris.io/jokes/random')
    .then(res => res.json());

  return joke.value.replace(/Chuck Norris|Chuck/ig, name);
}

const jokes = {
  patrick: getPatrickJoke,
  chuck: getChuckJoke,
  joke: getRandomJoke,
};

async function jokeBot(req, res) {
  const type = req.query.type || undefined;
  const name = req?.body?.text || undefined;

  const joke = await (jokes[type] ? jokes[type](name) : getRandomJoke());
  return res.send(joke);
}

module.exports = { getPatrickJoke, getRandomJoke, getChuckJoke, jokeBot };
