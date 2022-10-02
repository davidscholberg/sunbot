import dotenv from 'dotenv';
import FormData from 'form-data';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';

/* eslint-disable import/extensions */
import makeGetConfig from './bot/configure.js';
import makeRespond from './bot/respond.js';
import makeVerifyRequest from './bot/verify_request.js';
import makeGetCommandMap from './bot/command_map.js';
import makeExecuteCommand from './bot/execute_command.js';
import makeHandleRequest from './bot/handle_request.js';
/* eslint-enable import/extensions */

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  const config = makeGetConfig(process.env)();
  const respond = makeRespond(InteractionResponseType, FormData);
  const commandMap = makeGetCommandMap(config, respond)();
  const executeCommand = makeExecuteCommand(commandMap, respond);
  const verifyRequest = makeVerifyRequest(config, verifyKey);
  const handleRequest = makeHandleRequest(verifyRequest, respond, InteractionType, executeCommand);
  return handleRequest(event);
}
