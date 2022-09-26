export default function makeWeatherbit(config, http) {
  const getRequestConfig = (path, city) => ({
    url: path,
    method: 'get',
    baseURL: 'https://api.weatherbit.io',
    params: {
      key: config.weatherbitApiKey,
      city,
    },
    timeout: 30000,
    responseType: 'json',
    validateStatus: (status) => status === 200,
  });
  return {
    async getCurrentWeather(city) {
      const response = await http.request(getRequestConfig('/v2.0/current', city));
      return response.data.data[0];
    },
  };
}
