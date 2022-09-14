/* eslint-disable import/extensions */
import helloCommand from './commands/hello.js';
/* eslint-enable import/extensions */

const commandList = [
  helloCommand,
];
const commandMap = {};
commandList.forEach((command) => {
  commandMap[command.commandData.name] = command;
});
export default commandMap;
