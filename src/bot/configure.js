export default function makeGetConfig(env) {
  let config = null;
  return () => {
    if (config !== null) {
      return config;
    }
    config = {
      discordPublicKey: env.DISCORD_PUBLIC_KEY,
      discordToken: env.DISCORD_TOKEN,
      discordAppID: env.DISCORD_APP_ID,
      discordGuildID: env.DISCORD_GUILD_ID,
      weatherbitApiKey: env.WEATHERBIT_API_KEY,
    };
    Object.values(config).forEach((value) => {
      if (typeof value === 'undefined') {
        throw new Error('missing configuration variable');
      }
    });
    return config;
  };
}
