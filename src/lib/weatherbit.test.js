import convert from 'convert-units';
import makeWeatherbit from './weatherbit';

const config = {
  weatherbitApiKey: 'foo',
};

const http = {
  // eslint-disable-next-line no-unused-vars
  request: async (a) => Promise.resolve({
    data: {
      data: [
        {
          city_name: 'Paris',
          state_code: '11',
          country_code: 'FR',
          temp: 25,
          rh: 50,
          wind_cdir: 'SSW',
          wind_spd: 5,
          weather: {
            description: 'cloudy',
          },
        },
      ],
    },
  }),
};

const httpWithStateCode = {
  // eslint-disable-next-line no-unused-vars
  request: async (a) => Promise.resolve({
    data: {
      data: [
        {
          city_name: 'New York',
          state_code: 'NY',
          country_code: 'US',
          temp: 25,
          rh: 50,
          wind_cdir: 'SSW',
          wind_spd: 5,
          weather: {
            description: 'cloudy',
          },
        },
      ],
    },
  }),
};

const httpReject = {
  // eslint-disable-next-line no-unused-vars
  request: async (a) => Promise.reject(new Error('bar')),
};

test('weatherbit.getCurrentWeatherString returns expected values', async () => {
  const weatherbit = makeWeatherbit(config, http, convert);
  await expect(weatherbit.getCurrentWeatherString('london')).resolves.toBe('Paris, FR 25°C (77.00°F), 50% humidity, wind SSW at 18.00km/h (11.18mph), cloudy');
  const weatherbitWithStateCode = makeWeatherbit(config, httpWithStateCode, convert);
  await expect(weatherbitWithStateCode.getCurrentWeatherString('new york')).resolves.toBe('New York, NY, US 25°C (77.00°F), 50% humidity, wind SSW at 18.00km/h (11.18mph), cloudy');
  const weatherbitReject = makeWeatherbit(config, httpReject, convert);
  await expect(weatherbitReject.getCurrentWeatherString('london')).rejects.toMatchObject(new Error('bar'));
});
