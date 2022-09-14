import makeHandleRequest from './handle_request';

const event = {
  body: '{"foo": "bar"}',
};

// eslint-disable-next-line no-unused-vars
function verifyRequestTrue(e) {
  return true;
}

// eslint-disable-next-line no-unused-vars
function verifyRequestFalse(e) {
  return false;
}

// eslint-disable-next-line no-unused-vars
function executeCommandNull(body) {
  return null;
}

// eslint-disable-next-line no-unused-vars
function executeCommandNonNull(body) {
  return { foo: 'bar' };
}

test('handleRequest returns expected values', () => {
  expect(makeHandleRequest(verifyRequestFalse, executeCommandNonNull)(event)).toMatchObject({
    statusCode: 401,
    body: JSON.stringify('invalid request signature'),
  });
  expect(makeHandleRequest(verifyRequestTrue, executeCommandNull)(event)).toMatchObject({
    statusCode: 404,
  });
  expect(makeHandleRequest(verifyRequestTrue, executeCommandNonNull)(event)).toBe('{"foo":"bar"}');
});

test('handleRequest throws exceptions when parameters are missing needed properties', () => {
  expect(() => makeHandleRequest(verifyRequestTrue, executeCommandNonNull)({})).toThrow(new Error('event.body is missing'));
});
