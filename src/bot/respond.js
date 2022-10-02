export default function makeRespond(InteractionResponseType) {
  return {
    with401: (message) => ({
      statusCode: 401,
      body: JSON.stringify(message),
    }),
    with404: () => ({
      statusCode: 404,
    }),
    withPong: () => ({
      statusCode: 200,
      body: JSON.stringify({
        type: InteractionResponseType.PONG,
      }),
    }),
    withMessage: (message) => ({
      statusCode: 200,
      body: JSON.stringify({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: message,
        },
      }),
    }),
  };
}
