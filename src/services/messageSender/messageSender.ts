import {Message} from 'discord.js';
import {injectable} from 'inversify';

@injectable()
export class MessageSender {
    send(message: Message, messageContent: string) {
        message.channel.send(message.author.tag + messageContent);
    }

    reply(message: Message, messageContent: string) {
        return message.reply(messageContent);
    }
}