export default function makeTenor(config, http) {
  const getRequestConfig = (searchQuery, random = false) => ({
    url: '/v2/search',
    method: 'get',
    baseURL: 'https://tenor.googleapis.com',
    params: {
      key: config.tenorApiKey,
      q: searchQuery,
      client_key: 'sunbot',
      random,
    },
    timeout: 30000,
    responseType: 'json',
    validateStatus: (status) => status === 200,
  });
  return {
    async getRandomGif(searchQuery) {
      const response = await http.request(getRequestConfig(searchQuery, true));
      return response.data.results[0].url;
    },
  };
}
