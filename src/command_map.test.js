import commandMap from './command_map';

test('command map contains at least one entry', () => {
  expect(Object.keys(commandMap).length).toBeGreaterThan(0);
});

const commandStructure = {
  commandData: expect.objectContaining({
    name: expect.any(String),
    type: expect.any(Number),
    description: expect.any(String),
  }),
  respond: expect.any(Function),
};

test('command map entries have the proper structure', () => {
  Object.entries(commandMap).forEach(([commandName, command]) => {
    expect(typeof commandName).toBe('string');
    expect(command).toMatchObject(commandStructure);
  });
});
