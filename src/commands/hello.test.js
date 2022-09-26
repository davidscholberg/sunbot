import makeHelloCommand from './hello';

test('hello respond function returns expected values', async () => {
  await expect(makeHelloCommand().respond({})).resolves.toMatchObject({
    content: expect.any(String),
  });
});
