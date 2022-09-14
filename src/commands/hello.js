const commandData = {
  name: 'hello',
  type: 1,
  description: 'say hello to the bot!',
};

// eslint-disable-next-line no-unused-vars
function respond(data) {
  const greetings = ['hi', 'hello', 'hey there', 'greetings', 'hola', 'aloha'];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  return `${randomGreeting} (⁠☞ﾟ⁠ヮﾟ⁠)⁠☞`;
}

export default {
  commandData,
  respond,
};
