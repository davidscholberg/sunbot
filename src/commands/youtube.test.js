import makeYoutubeCommand from './youtube';

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

// eslint-disable-next-line no-unused-vars
const youtubeSearch = async (a) => Promise.resolve({
  id: {
    videoId: 'dQw4w9WgXcQ',
  },
});

// eslint-disable-next-line no-unused-vars
const youtubeSearchReject = async (a) => Promise.reject(new Error('gave you up'));

test('youtube respond function returns expected values', async () => {
  await expect(makeYoutubeCommand(youtubeSearch).respond(data)).resolves.toMatchObject({
    content: 'https://youtu.be/dQw4w9WgXcQ',
  });
  await expect(makeYoutubeCommand(youtubeSearch).respond(dataMissingValue)).rejects.toMatchObject(new TypeError('Cannot read properties of undefined (reading \'trim\')'));
  await expect(makeYoutubeCommand(youtubeSearch).respond(dataEmptyValue)).rejects.toMatchObject(new Error('search parameter is empty'));
  await expect(makeYoutubeCommand(youtubeSearchReject).respond(data)).rejects.toMatchObject(new Error('gave you up'));
});
