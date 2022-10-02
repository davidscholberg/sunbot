import axios from 'axios';
import convert from 'convert-units';

/* eslint-disable import/extensions */
import boopCommand from '../commands/boop.js';
import helloCommand from '../commands/hello.js';
import makeTenor from '../lib/tenor.js';
import makeWeatherbit from '../lib/weatherbit.js';
import makeYoutubeSearch from '../lib/youtube.js';
import weatherCommand from '../commands/weather.js';
import youtubeCommand from '../commands/youtube.js';
/* eslint-enable import/extensions */

function addCommandMapEntry(commandMap, command, execute) {
  const commandData = command.makeCommandData();
  // eslint-disable-next-line no-param-reassign
  commandMap[commandData.name] = {
    commandData,
    execute,
  };
}

export default function makeGetCommandMap(config, respond) {
  let commandMap = null;
  return () => {
    if (commandMap !== null) {
      return commandMap;
    }
    commandMap = {};
    addCommandMapEntry(commandMap, boopCommand, async (data) => {
      const execute = boopCommand.makeExecute(respond, makeTenor(config, axios));
      return execute(data);
    });
    addCommandMapEntry(commandMap, helloCommand, async (data) => {
      const execute = helloCommand.makeExecute(respond);
      return execute(data);
    });
    addCommandMapEntry(commandMap, weatherCommand, async (data) => {
      const execute = weatherCommand.makeExecute(respond, makeWeatherbit(config, axios), convert);
      return execute(data);
    });
    addCommandMapEntry(commandMap, youtubeCommand, async (data) => {
      const execute = youtubeCommand.makeExecute(respond, makeYoutubeSearch(config, axios));
      return execute(data);
    });
    return commandMap;
  };
}
