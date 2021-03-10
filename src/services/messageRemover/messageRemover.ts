import {Message, TextChannel} from 'discord.js';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {MessageSender} from "../messageSender/messageSender";

@injectable()
export class MessageRemover {
    private messageSender: MessageSender;
    
    constructor(
        @inject(TYPES.MessageSender) messageSender: MessageSender
    ) {
        this.messageSender = messageSender;
    }

    remove(message: Message, amount: number, force: string = null) {
        if (message.channel.type === 'text') {
            if (force === 'f' || force === 'F') {
                message.channel.bulkDelete(amount + 1, true);
            } else {
                message.channel.bulkDelete(amount + 1, false);
            }
        } 
        return this.messageSender.reply(message, 'I have cleared '+amount+' messages.');
    };
}