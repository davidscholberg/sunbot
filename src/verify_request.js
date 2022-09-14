export default function makeVerifyRequest(config, verifyKey) {
  return (event) => {
    if (!('x-signature-ed25519' in event.headers) || !('x-signature-timestamp' in event.headers)) {
      throw new Error('request is missing required headers');
    }
    const signature = event.headers['x-signature-ed25519'];
    const timestamp = event.headers['x-signature-timestamp'];
    if (typeof event.body === 'undefined') {
      throw new Error('event object is missing body property');
    }
    return verifyKey(event.body, signature, timestamp, config.discordPublicKey);
  };
}
