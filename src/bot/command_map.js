import axios from 'axios';
import convert from 'convert-units';

/* eslint-disable import/extensions */
import makeHelloCommand from '../commands/hello.js';
import makeWeatherbit from '../lib/weatherbit.js';
import makeWeatherCommand from '../commands/weather.js';
/* eslint-enable import/extensions */

export default function makeGetCommandMap(config) {
  const commandList = [
    makeHelloCommand(),
    makeWeatherCommand(makeWeatherbit(config, axios, convert)),
  ];
  let commandMap = null;
  return () => {
    if (commandMap !== null) {
      return commandMap;
    }
    commandMap = {};
    commandList.forEach((command) => {
      commandMap[command.commandData.name] = command;
    });
    return commandMap;
  };
}
