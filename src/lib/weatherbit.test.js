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
          foo: 'bar',
        },
      ],
    },
  }),
};

const httpReject = {
  // eslint-disable-next-line no-unused-vars
  request: async (a) => Promise.reject(new Error('baz')),
};

test('weatherbit.getCurrentWeatherString returns expected values', async () => {
  const weatherbit = makeWeatherbit(config, http);
  await expect(weatherbit.getCurrentWeather('london')).resolves.toMatchObject({ foo: 'bar' });
  const weatherbitReject = makeWeatherbit(config, httpReject);
  await expect(weatherbitReject.getCurrentWeather('london')).rejects.toMatchObject(new Error('baz'));
});
