export default {
  makeCommandData: () => ({
    name: 'youtube',
    type: 1,
    description: 'search for a youtube video',
    options: [
      {
        name: 'search_param',
        type: 3,
        description: 'search parameter to send to youtube',
        required: true,
      },
    ],
  }),
  makeExecute: (respond, youtubeSearch) => async (data) => {
    const searchQuery = data.options[0].value.trim();
    if (searchQuery.length === 0) {
      throw new Error('search parameter is empty');
    }
    const result = await youtubeSearch(searchQuery);
    return respond.withMessage(`https://youtu.be/${result.id.videoId}`);
  },
};
