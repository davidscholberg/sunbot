import makeHelloCommand from './hello';

test('hello respond function returns expected values', async () => {
  expect(typeof await makeHelloCommand().respond({})).toBe('string');
});
