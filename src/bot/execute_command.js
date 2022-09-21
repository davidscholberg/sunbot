export default function makeExecuteCommand(InteractionType, InteractionResponseType, commandMap) {
  return async (body) => {
    if (typeof body.type === 'undefined') {
      throw new Error('body.type is missing');
    }
    if (typeof InteractionType.PING === 'undefined') {
      throw new Error('InteractionType.PING is missing');
    }
    if (typeof InteractionResponseType.PONG === 'undefined') {
      throw new Error('InteractionResponseType.PONG is missing');
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
    if (typeof InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE === 'undefined') {
      throw new Error('InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE is missing');
    }
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: await command.respond(body.data) },
    };
  };
}
