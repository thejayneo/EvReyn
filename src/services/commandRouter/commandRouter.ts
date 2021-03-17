import {Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {PingResponder} from "../pingResponder/pingResponder";
import {MessageRemover} from "../messageRemover/messageRemover";
import {ChannelManager} from "../channelManager/channelManager";

@injectable()
export class CommandRouter {
  private command: string;
  private contents: Array<any>;
  private pingResponder: PingResponder;
  private messageRemover: MessageRemover;
  private channelManager: ChannelManager;

  constructor(
    @inject(TYPES.PingResponder) pingResponder: PingResponder,
    @inject(TYPES.MessageRemover) messageRemoveer: MessageRemover,
    @inject(TYPES.ChannelManager) channelManager: ChannelManager
  ) {
    this.pingResponder = pingResponder;
    this.messageRemover = messageRemoveer;
    this.channelManager = channelManager;
  }

  handle(message: Message): Promise<Message | Message[]> {

    // Assign command variable to first word in message without triggerchar.
    this.contents = message.content.substring(1).split(' ');
    this.command = this.contents[0];

    // Switch-Case routing of command messages
    // Administrator level commands
    if (message.member.guild.me.hasPermission('ADMINISTRATOR')) {
      switch (this.command) {
        case 'create':
          return this.channelManager.create(message, this.contents[1], this.contents[2], (this.contents[3] || false));
        case 'clone':
          return this.channelManager.clone(message);
        case 'delete':
          return this.channelManager.delete(message);
      }

    // Moderator level commands
    } else if (message.member.guild.me.hasPermission('MANAGE_MESSAGES'))
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