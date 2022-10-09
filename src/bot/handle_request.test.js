import makeHandleRequest from './handle_request';

const respond = {
  with401: () => '401',
  withPong: () => 'PONG',
};

const InteractionType = {
  PING: 1,
};

function verifyRequestTrue() {
  return true;
}

function verifyRequestFalse() {
  return false;
}

async function executeCommand() {
  return 'executed';
}

const eventWithPing = {
  body: `{
      "type": 1
    }`,
};

const eventWithCommand = {
  body: `{
      "type": 2
    }`,
};

const eventMissingType = {
  body: '{}',
};

test('handleRequest returns expected values', async () => {
  const handleRequestVerifyFalse = makeHandleRequest(
    verifyRequestFalse,
    respond,
    InteractionType,
    executeCommand,
  );
  await expect(handleRequestVerifyFalse({})).resolves.toBe('401');
  const handleRequest = makeHandleRequest(
    verifyRequestTrue,
    respond,
    InteractionType,
    executeCommand,
  );
  await expect(handleRequest({})).rejects.toMatchObject(new Error('event.body is missing'));
  await expect(handleRequest(eventMissingType)).rejects.toMatchObject(new Error('body.type is missing'));
  await expect(handleRequest(eventWithPing)).resolves.toBe('PONG');
  await expect(handleRequest(eventWithCommand)).resolves.toBe('executed');
});
