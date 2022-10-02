import convert from 'convert-units';

import weatherCommand from './weather';

const respond = {
  withMessage: (message) => ({
    message,
  }),
};

const data = {
  options: [
    {
      value: 'foo',
    },
  ],
};

const dataEmptyValue = {
  options: [
    {
      value: '',
    },
  ],
};

const dataMissingValue = {
  options: [
    {},
  ],
};

const weatherUS = {
  getCurrentWeather: async () => Promise.resolve({
    city_name: 'New York',
    state_code: 'NY',
    country_code: 'US',
    temp: 25,
    rh: 50,
    dewpt: 20,
    wind_cdir: 'SSW',
    wind_spd: 5,
    weather: {
      description: 'Cloudy',
    },
  }),
};

const weatherNonUS = {
  getCurrentWeather: async () => Promise.resolve({
    city_name: 'Paris',
    state_code: '11',
    country_code: 'FR',
    temp: 25,
    rh: 50,
    dewpt: 20,
    wind_cdir: 'SSW',
    wind_spd: 5,
    weather: {
      description: 'Cloudy',
    },
  }),
};

const weatherUSOutput = {
  message:
    '**Current weather for New York, NY, US**\n'
    + '>>> 🌡️ 25°C (77°F)\n'
    + '💦 50% humidity\n'
    + '🌬️ SSW at 18 km/h (11 mph)\n'
    + '👀 Cloudy',
};

const weatherNonUSOutput = {
  message:
    '**Current weather for Paris, FR**\n'
    + '>>> 🌡️ 25°C (77°F)\n'
    + '💦 50% humidity\n'
    + '🌬️ SSW at 18 km/h (11 mph)\n'
    + '👀 Cloudy',
};

const weatherReject = {
  getCurrentWeather: async () => Promise.reject(new Error('bar')),
};

test('weather execute function returns expected values', async () => {
  await expect(weatherCommand.makeExecute(respond, weatherUS, convert)(data))
    .resolves.toMatchObject(weatherUSOutput);
  await expect(weatherCommand.makeExecute(respond, weatherNonUS, convert)(data))
    .resolves.toMatchObject(weatherNonUSOutput);
  await expect(weatherCommand.makeExecute(respond, weatherUS)(dataMissingValue)).rejects.toMatchObject(new TypeError('Cannot read properties of undefined (reading \'trim\')'));
  await expect(weatherCommand.makeExecute(respond, weatherUS)(dataEmptyValue)).rejects.toMatchObject(new Error('city parameter is empty'));
  await expect(weatherCommand.makeExecute(respond, weatherReject)(data)).rejects.toMatchObject(new Error('bar'));
});
