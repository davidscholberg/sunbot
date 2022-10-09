export default function makeHandleRequest(verifyRequest, respond, InteractionType, executeCommand) {
  return async (event) => {
    if (!verifyRequest(event)) {
      return respond.with401('invalid request signature');
    }
    if (typeof event.body === 'undefined') {
      throw new Error('event.body is missing');
    }
    const body = JSON.parse(event.body);
    if (typeof body.type === 'undefined') {
      throw new Error('body.type is missing');
    }
    if (body.type === InteractionType.PING) {
      return respond.withPong();
    }
    return executeCommand(body);
  };
}
