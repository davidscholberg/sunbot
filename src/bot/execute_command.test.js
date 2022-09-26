import makeExecuteCommand from './execute_command';

const bodyWithPing = {
  type: 1,
  data: {
    name: 'foo',
  },
};

const bodyWithNonPing = {
  type: 2,
  data: {
    name: 'foo',
  },
};

const bodyMissingType = {
  data: {
    name: 'foo',
  },
};

const bodyMissingDataName = {
  type: 2,
  data: {},
};

const InteractionType = {
  PING: 1,
};

const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 2,
};

const commandMapWithFoo = {
  foo: {
    // eslint-disable-next-line no-unused-vars
    respond: async (data) => Promise.resolve({
      content: 'baz',
    }),
  },
};

const commandMapWithoutFoo = {
  bar: {
    // eslint-disable-next-line no-unused-vars
    respond: (data) => Promise.resolve({
      content: 'baz',
    }),
  },
};

test('executeCommand returns expected values', async () => {
  const executeCommandWithoutFoo = makeExecuteCommand(
    InteractionType,
    InteractionResponseType,
    commandMapWithoutFoo,
  );
  const executeCommandWithFoo = makeExecuteCommand(
    InteractionType,
    InteractionResponseType,
    commandMapWithFoo,
  );
  await expect(executeCommandWithoutFoo(bodyWithPing)).resolves.toMatchObject({
    type: InteractionResponseType.PONG,
  });
  await expect(executeCommandWithoutFoo(bodyWithNonPing)).resolves.toBeNull();
  await expect(executeCommandWithFoo(bodyWithNonPing)).resolves.toMatchObject({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content: 'baz' },
  });
});

test('executeCommand throws exceptions when parameters are missing needed properties', async () => {
  await expect(makeExecuteCommand(
    InteractionType,
    InteractionResponseType,
    commandMapWithFoo,
  )(bodyMissingType)).rejects.toMatchObject(new Error('body.type is missing'));
  await expect(makeExecuteCommand(
    InteractionType,
    InteractionResponseType,
    commandMapWithFoo,
  )(bodyMissingDataName)).rejects.toMatchObject(new Error('body.data.name is missing'));
});
