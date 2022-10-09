export default function makeRespond(InteractionResponseType, FormData) {
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
    withAttachment: (message, fileName, fileBuffer) => {
      const form = new FormData();
      form.append(
        'payload_json',
        JSON.stringify({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: message,
            attachments: [
              {
                id: 0,
              },
            ],
          },
        }),
        {
          contentType: 'application/json',
        },
      );
      form.append('files[0]', fileBuffer, { fileName });
      return {
        statusCode: 200,
        multiValueHeaders: form.getHeaders(),
        isBase64Encoded: true,
        body: form.getBuffer().toString('base64'),
      };
    },
  };
}
