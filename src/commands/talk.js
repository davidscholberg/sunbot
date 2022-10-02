export default {
  makeCommandData: () => ({
    name: 'talk',
    type: 1,
    description: 'make the bot talk!',
    options: [
      {
        name: 'sentence',
        type: 3,
        description: 'words to make the bot say',
        required: true,
      },
    ],
  }),
  makeExecute: (respond, textToSpeech, mediaConvert) => async (data) => {
    const sentence = data.options[0].value.trim();
    if (sentence.length === 0) {
      throw new Error('sentence parameter is empty');
    }
    const ttsResponse = await textToSpeech.synthesize({
      text: sentence,
      accept: 'audio/ogg;codecs=opus',
      voice: 'en-US_MichaelV3Voice',
    });
    const videoData = await mediaConvert.audioToMp4(ttsResponse.result);
    return respond.withAttachment('sunbot has a message:', videoData);
  },
};
