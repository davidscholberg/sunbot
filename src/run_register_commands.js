import axios from 'axios';
import dotenv from 'dotenv';

/* eslint-disable import/extensions */
import makeGetConfig from './bot/configure.js';
import makeGetCommandMap from './bot/command_map.js';
import makeRegisterCommands from './bot/register_commands.js';
/* eslint-enable import/extensions */

dotenv.config();
const config = makeGetConfig(process.env)();
const commandMap = makeGetCommandMap(config)();
const registerCommands = makeRegisterCommands(config, commandMap, axios);
const settledResults = await registerCommands();
settledResults.forEach((s) => {
  if (s.status === 'fulfilled') {
    console.log('success!');
  } else if (s.status === 'rejected') {
    process.exitCode = 1;
    console.error(`${s.status}: ${s.reason}`);
  } else {
    process.exitCode = 1;
    console.error(`unexpected result: ${s}`);
  }
});
