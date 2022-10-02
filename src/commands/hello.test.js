import helloCommand from './hello';

const respond = {
  withMessage: (message) => ({
    message,
  }),
};

test('hello execute function returns expected values', async () => {
  await expect(helloCommand.makeExecute(respond)({})).resolves.toMatchObject({
    message: expect.any(String),
  });
});
