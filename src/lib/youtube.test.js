import makeYoutubeSearch from './youtube';

const config = {
  youtubeApiKey: 'foo',
};

const http = {
  // eslint-disable-next-line no-unused-vars
  request: async (a) => Promise.resolve({
    data: {
      items: [
        {
          foo: 'bar',
        },
      ],
    },
  }),
};

const httpReject = {
  // eslint-disable-next-line no-unused-vars
  request: async (a) => Promise.reject(new Error('bar')),
};

test('youtubeSearch returns expected values', async () => {
  await expect(makeYoutubeSearch(config, http)('foo')).resolves.toMatchObject({ foo: 'bar' });
  await expect(makeYoutubeSearch(config, httpReject)('foo')).rejects.toMatchObject(new Error('bar'));
});
