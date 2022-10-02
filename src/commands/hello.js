export default {
  makeCommandData: () => ({
    name: 'hello',
    type: 1,
    description: 'say hello to the bot!',
  }),
  makeExecute: (respond) => async () => {
    const greetings = ['hi', 'hello', 'hey there', 'greetings', 'hola', 'aloha'];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    return respond.withMessage(`${randomGreeting} (⁠☞ﾟ⁠ヮﾟ⁠)⁠☞`);
  },
};
