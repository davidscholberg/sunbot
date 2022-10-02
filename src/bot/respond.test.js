import makeRespond from './respond';

const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 2,
};

class FormData {
  // eslint-disable-next-line class-methods-use-this
  append() {}

  // eslint-disable-next-line class-methods-use-this
  getHeaders() {
    return 'headers';
  }

  // eslint-disable-next-line class-methods-use-this
  getBuffer() {
    return Buffer.from('buffer');
  }
}

const respond = makeRespond(InteractionResponseType, FormData);

test('respond.with401 returns expected value', () => {
  expect(respond.with401('foo')).toMatchObject({
    statusCode: 401,
    body: '"foo"',
  });
});

test('respond.with404 returns expected value', () => {
  expect(respond.with404()).toMatchObject({
    statusCode: 404,
  });
});

test('respond.withPong returns expected value', () => {
  expect(respond.withPong()).toMatchObject({
    statusCode: 200,
    body: '{"type":1}',
  });
});

test('respond.withMessage returns expected value', () => {
  expect(respond.withMessage('foo')).toMatchObject({
    statusCode: 200,
    body: '{"type":2,"data":{"content":"foo"}}',
  });
});

test('respond.withAttachment returns expected value', () => {
  expect(respond.withAttachment('foo', 'bar', 'baz')).toMatchObject({
    statusCode: 200,
    multiValueHeaders: 'headers',
    isBase64Encoded: true,
    body: 'YnVmZmVy',
  });
});
