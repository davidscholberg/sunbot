import convert from 'convert-units';

import makeWeatherCommand from './weather';

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
  // eslint-disable-next-line no-unused-vars
  getCurrentWeather: async (a) => Promise.resolve({
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
  // eslint-disable-next-line no-unused-vars
  getCurrentWeather: async (a) => Promise.resolve({
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
  embeds: [
    {
      title: 'Current weather for New York, NY, US',
      fields: [
        {
          name: '\u200B',
          value: '25°C (77.00°F)',
        },
        {
          name: '\u200B',
          value: '50% humidity',
        },
        {
          name: '\u200B',
          value: 'Dew point 20°C (68.00°F)',
        },
        {
          name: '\u200B',
          value: 'Wind SSW at 18.00km/h (11.18mph)',
        },
        {
          name: '\u200B',
          value: 'Cloudy',
        },
      ],
    },
  ],
};

const weatherNonUSOutput = {
  embeds: [
    {
      title: 'Current weather for Paris, FR',
      fields: [
        {
          name: '\u200B',
          value: '25°C (77.00°F)',
        },
        {
          name: '\u200B',
          value: '50% humidity',
        },
        {
          name: '\u200B',
          value: 'Dew point 20°C (68.00°F)',
        },
        {
          name: '\u200B',
          value: 'Wind SSW at 18.00km/h (11.18mph)',
        },
        {
          name: '\u200B',
          value: 'Cloudy',
        },
      ],
    },
  ],
};

const weatherReject = {
  // eslint-disable-next-line no-unused-vars
  getCurrentWeather: async (a) => Promise.reject(new Error('bar')),
};

test('weather respond function returns expected values', async () => {
  await expect(makeWeatherCommand(weatherUS, convert).respond(data))
    .resolves.toMatchObject(weatherUSOutput);
  await expect(makeWeatherCommand(weatherNonUS, convert).respond(data))
    .resolves.toMatchObject(weatherNonUSOutput);
  await expect(makeWeatherCommand(weatherUS).respond(dataMissingValue)).rejects.toMatchObject(new TypeError('Cannot read properties of undefined (reading \'trim\')'));
  await expect(makeWeatherCommand(weatherUS).respond(dataEmptyValue)).rejects.toMatchObject(new Error('city parameter is empty'));
  await expect(makeWeatherCommand(weatherReject).respond(data)).rejects.toMatchObject(new Error('bar'));
});
