export default function makeWeatherCommand(weather, convert) {
  return {
    commandData: {
      name: 'weather',
      type: 1,
      description: 'get the current weather',
      options: [
        {
          name: 'city',
          type: 3,
          description: 'city to get current weather for',
          required: true,
        },
      ],
    },
    respond: async (data) => {
      const city = data.options[0].value.trim();
      if (city.length === 0) {
        throw new Error('city parameter is empty');
      }
      const weatherData = await weather.getCurrentWeather(city);
      return {
        content:
          `**Current weather for ${weatherData.city_name},${weatherData.country_code === 'US' ? ` ${weatherData.state_code},` : ''} ${weatherData.country_code}**\n`
          + `>>> 🌡️ ${Math.round(weatherData.temp)}°C (${Math.round(convert(weatherData.temp).from('C').to('F'))}°F)\n`
          + `💦 ${weatherData.rh}% humidity\n`
          + `🌬️ ${weatherData.wind_cdir} at ${Math.round(convert(weatherData.wind_spd).from('m/s').to('km/h'))} km/h`
          + ` (${Math.round(convert(weatherData.wind_spd).from('m/s').to('m/h'))} mph)\n`
          + `👀 ${weatherData.weather.description}`,
      };
    },
  };
}
