# sunbot

sunbot is a serverless [Discord][1] bot that may or may not shine brighter than the sun (more than likely the latter).

[1]: https://discord.com/

#### Serverless?

Yes! sunbot operates on the [serverless computing][2] model. This means that rather than continuously run, sunbot sits behind a webserver and only runs when requests come in. This is possible due to Discord's support for [interactions via webhooks][3].

Currently, sunbot will work out of the box as a [AWS Lambda][4] function, provided that you change the handler setting to `src/index.handler`.

[2]: https://en.wikipedia.org/wiki/Serverless_computing
[3]: https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
[4]: https://aws.amazon.com/lambda/

### Configuration

```bash
cp .env.sample .env
chmod 600 .env
```

Edit `.env` as needed.

### Deployment

```bash
npm run deploy
```

The deployment script assumes that you're using AWS Lambda to host sunbot and that you have [AWS CLI][5] installed and configured.

[5]: https://aws.amazon.com/cli/

### Project Directory Structure

* [src/][6]
    * [bot/][7] - The core code of the bot lives here.
    * [commands/][8] - Each Discord command managed by sunbot is defined in a file in this directory.
    * [lib/][9] - General library code should go here.
    * [index.js][10] - This is the entry point of the bot's request handler.
    * [run_register_commands.js][11] - This script registers the bot's commands to Discord. It exists outside of the request handler because it only needs to be run when a command is added or updated. The `npm run deploy` script runs this script automatically.

[6]: src
[7]: src/bot
[8]: src/commands
[9]: src/lib
[10]: src/index.js
[11]: src/run_register_commands.js

### Credits

Most of the core code in this bot is based on code from [Build a Discord Bot With AWS Lambda + API Gateway][12] by [jakjus][13].

[12]: https://betterprogramming.pub/build-a-discord-bot-with-aws-lambda-api-gateway-cc1cff750292
[13]: https://jakjus.com/
