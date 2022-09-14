import makeGetConfig from './configure';

const envTest = {
  DISCORD_PUBLIC_KEY: 'discord_public_key',
  DISCORD_TOKEN: 'discord_token',
  DISCORD_APP_ID: 'discord_app_id',
  DISCORD_GUILD_ID: 'discord_guild_id',
};

const configStructure = {
  discordPublicKey: 'discord_public_key',
  discordToken: 'discord_token',
  discordAppID: 'discord_app_id',
  discordGuildID: 'discord_guild_id',
};

test('config contains all needed entries at their expected values', () => {
  expect(makeGetConfig(envTest)()).toMatchObject(configStructure);
});

test('configure throws exception when config entry is missing', () => {
  expect(() => makeGetConfig({})()).toThrow(new Error('missing configuration variable'));
});
