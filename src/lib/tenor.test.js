import makeTenor from './tenor';

const config = {
  tenorApiKey: 'foo',
};

const http = {
  // eslint-disable-next-line no-unused-vars
  request: async (a) => Promise.resolve({
    data: {
      results: [
        {
          url: 'bar',
        },
      ],
    },
  }),
};

const httpReject = {
  // eslint-disable-next-line no-unused-vars
  request: async (a) => Promise.reject(new Error('baz')),
};

test('tenor.getRandomGif returns expected values', async () => {
  const tenor = makeTenor(config, http);
  await expect(tenor.getRandomGif('foo')).resolves.toBe('bar');
  const tenorReject = makeTenor(config, httpReject);
  await expect(tenorReject.getRandomGif('foo')).rejects.toMatchObject(new Error('baz'));
});
