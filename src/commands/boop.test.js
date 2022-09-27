import makeBoopCommand from './boop';

const gifSearch = {
  // eslint-disable-next-line no-unused-vars
  getRandomGif: async (a) => Promise.resolve('foo'),
};

const gifSearchReject = {
  // eslint-disable-next-line no-unused-vars
  getRandomGif: async (a) => Promise.reject(new Error('bar')),
};

test('boop respond function returns expected values', async () => {
  await expect(makeBoopCommand(gifSearch).respond({})).resolves.toMatchObject({
    content: 'foo',
  });
  await expect(makeBoopCommand(gifSearchReject).respond({})).rejects.toMatchObject(new Error('bar'));
});
