export default function makeRegisterCommands(config, commandMap, http) {
  const getRequestConfig = (commandData) => ({
    url: `/api/v10/applications/${config.discordAppID}/guilds/${config.discordGuildID}/commands`,
    method: 'post',
    baseURL: 'https://discord.com',
    headers: {
      Authorization: `Bot ${config.discordToken}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(commandData),
    timeout: 30000,
    responseType: 'json',
    validateStatus: (status) => status === 200 || status === 201,
  });
  return () => {
    const promises = [];
    Object.values(commandMap).forEach((command) => {
      const promise = http.request(getRequestConfig(command.commandData));
      promises.push(promise);
    });
    return Promise.allSettled(promises);
  };
}
