import { Readable } from 'stream';

import streamToBuffer from './stream_to_buffer';

function* values() {
  yield 'foo';
  yield 'bar';
  yield 'baz';
  yield null;
}

const valueGenerator = values();

const stream = new Readable({
  read() {
    this.push(valueGenerator.next().value);
  },
});

test('streamToBuffer returns expected values', async () => {
  await expect(streamToBuffer(stream)).resolves.toMatchObject(Buffer.from('foobarbaz'));
});
