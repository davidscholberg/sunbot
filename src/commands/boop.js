export default function makeBoopCommand(gifSearch) {
  return {
    commandData: {
      name: 'boop',
      type: 1,
      description: 'send a boop! (powered by tenor)',
    },
    // eslint-disable-next-line no-unused-vars
    respond: async (data) => ({
      content: await gifSearch.getRandomGif('boop'),
    }),
  };
}
