import boopCommand from './boop';

const respond = {
  withMessage: (message) => ({
    message,
  }),
};

const gifSearch = {
  getRandomGif: async () => Promise.resolve('foo'),
};

const gifSearchReject = {
  getRandomGif: async () => Promise.reject(new Error('bar')),
};

test('boop execute function returns expected values', async () => {
  await expect(boopCommand.makeExecute(respond, gifSearch)({})).resolves.toMatchObject({
    message: 'foo',
  });
  await expect(boopCommand.makeExecute(respond, gifSearchReject)({})).rejects.toMatchObject(new Error('bar'));
});
