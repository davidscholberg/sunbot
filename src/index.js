import dotenv from 'dotenv';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';

/* eslint-disable import/extensions */
import makeGetConfig from './configure.js';
import makeVerifyRequest from './verify_request.js';
import commandMap from './command_map.js';
import makeExecuteCommand from './execute_command.js';
import makeHandleRequest from './handle_request.js';
/* eslint-enable import/extensions */

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  const config = makeGetConfig(process.env)();
  const verifyRequest = makeVerifyRequest(config, verifyKey);
  const executeCommand = makeExecuteCommand(InteractionType, InteractionResponseType, commandMap);
  const handleRequest = makeHandleRequest(verifyRequest, executeCommand);
  return handleRequest(event);
}
