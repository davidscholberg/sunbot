export default async function streamToBuffer(stream) {
  return new Promise((resolve) => {
    stream.on('readable', () => {
      const dataChunks = [];
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const dataChunk = stream.read();
        if (dataChunk === null) {
          break;
        }
        dataChunks.push(dataChunk);
      }
      resolve(Buffer.concat(dataChunks));
    });
  });
}
