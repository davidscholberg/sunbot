import makeVerifyRequest from './verify_request';

const config = {
  discordPublicKey: 'discord_public_key',
};

// eslint-disable-next-line no-unused-vars
function verifyKeyTrue(a, b, c, d) {
  return true;
}

// eslint-disable-next-line no-unused-vars
function verifyKeyFalse(a, b, c, d) {
  return false;
}

const event = {
  headers: {
    'x-signature-ed25519': 'foo',
    'x-signature-timestamp': 'bar',
  },
  body: 'baz',
};

const eventMissingEd25519Header = {
  headers: {
    'x-signature-timestamp': 'bar',
  },
  body: 'baz',
};

const eventMissingTimestampHeader = {
  headers: {
    'x-signature-ed25519': 'foo',
  },
  body: 'baz',
};

const eventMissingBody = {
  headers: {
    'x-signature-ed25519': 'foo',
    'x-signature-timestamp': 'bar',
  },
};

test('verifyRequest returns expected values', () => {
  expect(makeVerifyRequest(config, verifyKeyTrue)(event)).toBe(true);
  expect(makeVerifyRequest(config, verifyKeyFalse)(event)).toBe(false);
});

test('verifyRequest throws exceptions when event object is missing needed properties', () => {
  const verifyRequest = makeVerifyRequest(config, verifyKeyTrue);
  expect(() => verifyRequest(eventMissingEd25519Header)).toThrow(new Error('request is missing required headers'));
  expect(() => verifyRequest(eventMissingTimestampHeader)).toThrow(new Error('request is missing required headers'));
  expect(() => verifyRequest(eventMissingBody)).toThrow(new Error('event object is missing body property'));
});
