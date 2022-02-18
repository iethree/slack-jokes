const { expect } = require('chai');

const { getPatrickJoke, getChuckJoke, getRandomJoke } = require('../index');

describe('has jokes', () => {
  it('gets a random joke', () => {
    const joke = getRandomJoke();
    expect(joke).to.be.a('string');
  });

  it('gets a jeff dean joke', async () => {
    const joke = await getPatrickJoke();
    expect(joke).to.include('Patrick');
  });

  it('gets a modified jeff dean joke', async () => {
    const joke = await getPatrickJoke('Aaron');
    expect(joke).to.include('Aaron');
  });

  it('gets a chuck norris joke', async () => {
    const joke = await getChuckJoke();
    expect(joke).to.include('Chuck Norris');
  });

  it('gets a modified chuck norris joke', async () => {
    const joke = await getChuckJoke('Kaaaate');
    await expect(joke).to.include('Kaaaate');
  });
});
