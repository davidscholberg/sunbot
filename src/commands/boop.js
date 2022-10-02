export default {
  makeCommandData: () => ({
    name: 'boop',
    type: 1,
    description: 'send a boop! (powered by tenor)',
  }),
  makeExecute: (respond, gifSearch) => async () => {
    const gifUrl = await gifSearch.getRandomGif('boop');
    return respond.withMessage(gifUrl);
  },
};
