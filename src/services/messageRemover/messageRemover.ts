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

    remove(message: Message, amount: number | string, force: string = null) {
        if (message.channel.type === 'text') {
            if ((amount === 'all') && !force) {
                console.log('')
                return this.messageSender.reply(message, 'you attempted to delete all messages in the channel without force. See help for more details.');
            } else if ((amount === 'all') && (force === 'f' || force === 'F')) {
                message.channel.bulkDelete(1000000, true);
            } else if (typeof(amount) === 'number') {
                try {
                    message.channel.bulkDelete(amount + 1, false);
                } catch (error) {
                    console.log(error);
                    return (error);
                }
            }
        } 
        return this.messageSender.reply(message, 'I have cleared '+amount+' messages.');
    };
}