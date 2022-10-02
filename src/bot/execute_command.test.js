import makeExecuteCommand from './execute_command';

const commandMap = {
  foo: {
    execute: async () => Promise.resolve('baz'),
  },
};

const respond = {
  with404: () => '404',
};

const bodyWithKnownCommand = {
  data: {
    name: 'foo',
  },
};

const bodyWithUnknownCommand = {
  data: {
    name: 'bar',
  },
};

const bodyMissingDataName = {
  data: {},
};

test('executeCommand returns expected values', async () => {
  const executeCommand = makeExecuteCommand(
    commandMap,
    respond,
  );
  await expect(executeCommand(bodyMissingDataName)).rejects.toMatchObject(new Error('body.data.name is missing'));
  await expect(executeCommand(bodyWithUnknownCommand)).resolves.toBe('404');
  await expect(executeCommand(bodyWithKnownCommand)).resolves.toBe('baz');
});
