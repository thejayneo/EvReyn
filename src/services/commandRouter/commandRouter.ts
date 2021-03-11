import {Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {PingResponder} from "../pingResponder/pingResponder";
import {MessageRemover} from "../messageRemover/messageRemover";

@injectable()
export class CommandRouter {
  private command: string;
  private pingResponder: PingResponder;
  private messageRemover: MessageRemover;

  constructor(
    @inject(TYPES.PingResponder) pingResponder: PingResponder,
    @inject(TYPES.MessageRemover) messageRemoveer: MessageRemover
  ) {
    this.pingResponder = pingResponder;
    this.messageRemover = messageRemoveer;
  }

  handle(message: Message): Promise<Message | Message[]> {
    // Assign command variable to first word in message without triggerchar.
    this.command = message.content.substring(1).split(' ')[0];
    // Switch-Case routing of command messages
    // Administrator level commands (Need to add admin role check)
    // Moderator level commands (Need to add moderator role check)
    switch (this.command) {
        case 'clear':
            return this.messageRemover.remove(message, message.content.split(' ')[1], message.content.split(' ')[2]);
    }
    // General user commands
    switch (this.command) {
        case 'ping':
            return this.pingResponder.respond(message);
    }
    return Promise.reject();
  }
}