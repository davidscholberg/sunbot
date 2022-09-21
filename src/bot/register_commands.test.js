import makeRegisterCommands from './register_commands';

const config = {
  discordAppID: 'discord_app_id',
  discordGuildID: 'discord_guild_id',
  discordToken: 'discord_token',
};

const commandMap = {
  foo: {
    commandData: {},
  },
};

const httpNoError = {
  // eslint-disable-next-line no-unused-vars
  request: (a) => Promise.resolve({}),
};

const httpError = {
  // eslint-disable-next-line no-unused-vars
  request: (a) => Promise.reject(new Error('request failed')),
};

test('registerCommands returns expected values', async () => {
  await expect(makeRegisterCommands(config, commandMap, httpNoError)()).resolves.toMatchObject([{ status: 'fulfilled', value: {} }]);
  await expect(makeRegisterCommands(config, commandMap, httpError)()).resolves.toMatchObject([{ status: 'rejected', reason: new Error('request failed') }]);
});
