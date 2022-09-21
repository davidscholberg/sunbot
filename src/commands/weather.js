export default function makeWeatherCommand(weather) {
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
      return weather.getCurrentWeatherString(city);
    },
  };
}
