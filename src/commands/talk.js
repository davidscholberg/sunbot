export default function makeTalkCommand(textToSpeech, mediaConvert, FormData) {
  return {
    commandData: {
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
    },
    respond: async (data, response) => {
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
      const form = FormData();
      form.append('video', videoData);
      form.append('json_data', JSON.stringify({

      }));
      response.multiValueHeaders = form.getHeaders();
      response.body = form.getBuffer();
      return response;
    },
  };
}
