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
      const weatherDataFields = [
        `${weatherData.temp}°C (${convert(weatherData.temp).from('C').to('F').toFixed(2)}°F)`,
        `${weatherData.rh}% humidity`,
        `Dew point ${weatherData.dewpt}°C (${convert(weatherData.dewpt).from('C').to('F').toFixed(2)}°F)`,
        `Wind ${weatherData.wind_cdir} at ${convert(weatherData.wind_spd).from('m/s').to('km/h').toFixed(2)}km/h`
        + ` (${convert(weatherData.wind_spd).from('m/s').to('m/h').toFixed(2)}mph)`,
        `${weatherData.weather.description}`,
      ];
      return {
        embeds: [
          {
            title: `Current weather for ${weatherData.city_name},${weatherData.country_code === 'US' ? ` ${weatherData.state_code},` : ''} ${weatherData.country_code}`,
            fields: weatherDataFields.map((f) => ({
              name: '\u200B',
              value: f,
            })),
          },
        ],
      };
    },
  };
}
