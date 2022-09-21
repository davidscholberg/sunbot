import makeWeatherCommand from './weather';

const data = {
  options: [
    {
      value: 'london',
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

const weather = {
  // eslint-disable-next-line no-unused-vars
  getCurrentWeatherString: async (a) => Promise.resolve('foo'),
};

const weatherReject = {
  // eslint-disable-next-line no-unused-vars
  getCurrentWeatherString: async (a) => Promise.reject(new Error('bar')),
};

test('weather respond function returns expected values', async () => {
  await expect(makeWeatherCommand(weather).respond(data)).resolves.toBe('foo');
  await expect(makeWeatherCommand(weather).respond(dataMissingValue)).rejects.toMatchObject(new TypeError('Cannot read properties of undefined (reading \'trim\')'));
  await expect(makeWeatherCommand(weather).respond(dataEmptyValue)).rejects.toMatchObject(new Error('city parameter is empty'));
  await expect(makeWeatherCommand(weatherReject).respond(data)).rejects.toMatchObject(new Error('bar'));
});
