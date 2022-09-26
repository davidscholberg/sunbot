export default function makeExecuteCommand(InteractionType, InteractionResponseType, commandMap) {
  return async (body) => {
    if (typeof body.type === 'undefined') {
      throw new Error('body.type is missing');
    }
    if (body.type === InteractionType.PING) {
      return { type: InteractionResponseType.PONG };
    }
    if (typeof body.data.name === 'undefined') {
      throw new Error('body.data.name is missing');
    }
    if (!(body.data.name in commandMap)) {
      return null;
    }
    const command = commandMap[body.data.name];
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: await command.respond(body.data),
    };
  };
}
