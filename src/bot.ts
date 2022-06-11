import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import {CommandRouter} from "./services/commandRouter/CommandRouter";

@injectable()
export class Bot {
  private client: Client;
  private readonly token: string;
  private CommandRouter: CommandRouter;
  private triggerChar: string;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.CommandRouter) CommandRouter: CommandRouter) {
    this.client = client;
    this.token = token;
    this.CommandRouter = CommandRouter;
    this.triggerChar = '!';
  }

  // Initiate bot listening for messages
  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => {
      // Ignore messages without command trigger and private messages
      if (!message.content.startsWith(this.triggerChar) || !message.guild) {
        return;
      }
      // Ignore messages from bots (self & others)
      if (message.author.bot) {
        console.log("Message <Bot: " + message.author.username + ">: Message ignored.")
        return;
      }
      // Log user messages
      console.log("Message <" + message.author.username + "#" + message.author.discriminator + ">:",message.content);
      // Pass to listener service
      this.CommandRouter.handle(message).then(() => {
        console.log("Response sent!");
      }).catch(() => {
        console.log("Response not sent.")
      })
    });

    return this.client.login(this.token);
  }
}
