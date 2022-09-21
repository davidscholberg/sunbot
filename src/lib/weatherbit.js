export default function makeWeatherbit(config, http, convert) {
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
    async getCurrentWeatherString(city) {
      const data = await this.getCurrentWeather(city);
      return `${data.city_name},${data.country_code === 'US' ? ` ${data.state_code},` : ''} ${data.country_code}`
      + ` ${data.temp}°C (${convert(data.temp).from('C').to('F').toFixed(2)}°F),`
      + ` ${data.rh}% humidity,`
      + ` wind ${data.wind_cdir} at`
      + ` ${convert(data.wind_spd).from('m/s').to('km/h').toFixed(2)}km/h`
      + ` (${convert(data.wind_spd).from('m/s').to('m/h').toFixed(2)}mph),`
      + ` ${data.weather.description.toLowerCase()}`;
    },
  };
}
