import hello from './hello';

test('hello respond function returns expected values', () => {
  expect(typeof hello.respond({})).toBe('string');
});
