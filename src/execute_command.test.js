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

const InteractionResponseTypeMissingPong = {
  CHANNEL_MESSAGE_WITH_SOURCE: 2,
};

const InteractionResponseTypeMissingChannel = {
  PONG: 1,
};

const commandMapWithFoo = {
  foo: {
    // eslint-disable-next-line no-unused-vars
    respond: (data) => 'baz',
  },
};

const commandMapWithoutFoo = {
  bar: {
    // eslint-disable-next-line no-unused-vars
    respond: (data) => 'baz',
  },
};

test('executeCommand returns expected values', () => {
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
  expect(executeCommandWithoutFoo(bodyWithPing)).toMatchObject({
    type: InteractionResponseType.PONG,
  });
  expect(executeCommandWithoutFoo(bodyWithNonPing)).toBeNull();
  expect(executeCommandWithFoo(bodyWithNonPing)).toMatchObject({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content: 'baz' },
  });
});

test('executeCommand throws exceptions when parameters are missing needed properties', () => {
  expect(() => makeExecuteCommand(
    InteractionType,
    InteractionResponseType,
    commandMapWithFoo,
  )(bodyMissingType)).toThrow(new Error('body.type is missing'));
  expect(() => makeExecuteCommand(
    InteractionType,
    InteractionResponseType,
    commandMapWithFoo,
  )(bodyMissingDataName)).toThrow(new Error('body.data.name is missing'));
  expect(() => makeExecuteCommand(
    {},
    InteractionResponseType,
    commandMapWithFoo,
  )(bodyWithNonPing)).toThrow(new Error('InteractionType.PING is missing'));
  expect(() => makeExecuteCommand(
    InteractionType,
    InteractionResponseTypeMissingPong,
    commandMapWithFoo,
  )(bodyWithNonPing)).toThrow(new Error('InteractionResponseType.PONG is missing'));
  expect(() => makeExecuteCommand(
    InteractionType,
    InteractionResponseTypeMissingChannel,
    commandMapWithFoo,
  )(bodyWithNonPing)).toThrow(new Error('InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE is missing'));
});
