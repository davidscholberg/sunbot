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

### Adding slash commands

Each slash command managed by sunbot is defined in a file in [src/commands][6].

[6]: src/commands

### Credits

Most of the core code in this bot is based on code from [Build a Discord Bot With AWS Lambda + API Gateway][7] by [jakjus][8].

[7]: https://betterprogramming.pub/build-a-discord-bot-with-aws-lambda-api-gateway-cc1cff750292
[8]: https://jakjus.com/
