export default function makeHelloCommand() {
  return {
    commandData: {
      name: 'hello',
      type: 1,
      description: 'say hello to the bot!',
    },
    // eslint-disable-next-line no-unused-vars
    respond: async (data) => {
      const greetings = ['hi', 'hello', 'hey there', 'greetings', 'hola', 'aloha'];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      return `${randomGreeting} (⁠☞ﾟ⁠ヮﾟ⁠)⁠☞`;
    },
  };
}
