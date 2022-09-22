export default function makeYoutubeSearch(config, http) {
  const getRequestConfig = (searchQuery) => ({
    url: '/youtube/v3/search',
    method: 'get',
    baseURL: 'https://www.googleapis.com',
    params: {
      key: config.youtubeApiKey,
      part: 'snippet',
      maxResults: 1,
      q: searchQuery,
      type: 'video',
    },
    timeout: 30000,
    responseType: 'json',
    validateStatus: (status) => status === 200,
  });
  return async (searchQuery) => {
    const response = await http.request(getRequestConfig(searchQuery));
    return response.data.items[0];
  };
}
