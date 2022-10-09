import youtubeCommand from './youtube';

const respond = {
  withMessage: (message) => ({
    message,
  }),
};

const data = {
  options: [
    {
      value: 'never gonna give you up',
    },
  ],
};

const dataEmptyValue = {
  options: [
    {
      value: '',
    },
  ],
};

const dataMissingValue = {
  options: [
    {},
  ],
};

const youtubeSearch = async () => Promise.resolve({
  id: {
    videoId: 'dQw4w9WgXcQ',
  },
});

const youtubeSearchReject = async () => Promise.reject(new Error('gave you up'));

test('youtube respond function returns expected values', async () => {
  await expect(youtubeCommand.makeExecute(respond, youtubeSearch)(data)).resolves.toMatchObject({
    message: 'https://youtu.be/dQw4w9WgXcQ',
  });
  await expect(youtubeCommand.makeExecute(respond, youtubeSearch)(dataMissingValue)).rejects.toMatchObject(new TypeError('Cannot read properties of undefined (reading \'trim\')'));
  await expect(youtubeCommand.makeExecute(respond, youtubeSearch)(dataEmptyValue)).rejects.toMatchObject(new Error('search parameter is empty'));
  await expect(youtubeCommand.makeExecute(respond, youtubeSearchReject)(data)).rejects.toMatchObject(new Error('gave you up'));
});
