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

test('handleRequest returns expected values', async () => {
  await expect(makeHandleRequest(verifyRequestFalse, executeCommandNonNull)(event)).resolves
    .toMatchObject({
      statusCode: 401,
      body: JSON.stringify('invalid request signature'),
    });
  await expect(makeHandleRequest(verifyRequestTrue, executeCommandNull)(event)).resolves
    .toMatchObject({
      statusCode: 404,
    });
  await expect(makeHandleRequest(verifyRequestTrue, executeCommandNonNull)(event)).resolves.toBe('{"foo":"bar"}');
});

test('handleRequest throws exceptions when parameters are missing needed properties', async () => {
  await expect(makeHandleRequest(verifyRequestTrue, executeCommandNonNull)({})).rejects.toMatchObject(new Error('event.body is missing'));
});
