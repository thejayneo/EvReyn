import {Message} from 'discord.js';
import {injectable} from 'inversify';

@injectable()
export class MessageSender {
    send(message: Message, messageContent: string): Promise<Message> {
        return message.channel.send(message.author.tag+' '+messageContent);
    }

    reply(message: Message, messageContent: string): Promise<Message> {
        return message.reply(messageContent);
    }
}