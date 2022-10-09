export default function makeExecuteCommand(commandMap, respond) {
  return async (body) => {
    if (typeof body.data.name === 'undefined') {
      throw new Error('body.data.name is missing');
    }
    if (!(body.data.name in commandMap)) {
      return respond.with404();
    }
    const command = commandMap[body.data.name];
    return command.execute(body.data);
  };
}
