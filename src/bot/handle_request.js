export default function makeHandleRequest(verifyRequest, executeCommand) {
  return async (event) => {
    if (!verifyRequest(event)) {
      return {
        statusCode: 401,
        body: JSON.stringify('invalid request signature'),
      };
    }
    if (typeof event.body === 'undefined') {
      throw new Error('event.body is missing');
    }
    const body = JSON.parse(event.body);
    const responseData = await executeCommand(body);
    if (responseData === null) {
      return {
        statusCode: 404,
      };
    }
    return JSON.stringify(responseData);
  };
}
