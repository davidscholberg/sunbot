import axios from 'axios';
import dotenv from 'dotenv';

/* eslint-disable import/extensions */
import makeGetConfig from './configure.js';
import commandMap from './command_map.js';
import makeRegisterCommands from './register_commands.js';
/* eslint-enable import/extensions */

dotenv.config();
const config = makeGetConfig(process.env)();
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
