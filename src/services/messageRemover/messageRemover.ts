import {Client, DiscordAPIError, Guild, Message, TextChannel} from 'discord.js';
import {inject, injectable} from 'inversify';
import { Bot } from '../../bot';
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

    remove(message: Message, amount: string, force: string = null): Promise<Message> {
        const amountAsNumber: number = parseInt(amount);
        // Channel type check enables use of TextChannel bulkDelete method below
        if (message.channel.type === 'text') {
            // Check if valid amount is provided
            if (amount === undefined || amountAsNumber <= 0) {
                return this.messageSender.reply(message, "you didn't provide a valid amount of messages to clear!");
            // Execute function if amount <= 100
            } else if (amountAsNumber<=100) {
                message.channel.bulkDelete(amountAsNumber, false);
                return this.messageSender.reply(message, 'I have cleared '+amount+' messages.');
            // Create loop to handle bulk delete for 100 < amount <= 1000.
            } else if ((amountAsNumber>100)&&(amountAsNumber<=1000)) {
                const fullLoops:number = Math.floor(amountAsNumber/100);
                const remainder:number = amountAsNumber - (fullLoops * amountAsNumber);
                let counter:number = 0;
                while (counter < fullLoops){
                    message.channel.bulkDelete(100, false);
                    counter++;
                }
                message.channel.bulkDelete(remainder, false);
                return this.messageSender.reply(message, 'I have cleared '+amount+' messages.');
            // Check for force flag when asking to delete all messages.
            } else if ((amount === 'all') && !force) {
                return this.messageSender.reply(message, 'you attempted to delete all messages in the channel without force. See help for more details.');
            // Loop delete for > 1000 potentially resource intensive. Clone channel, delete old channel, rename clone to name of old channel and post completion message in new channel.
            } else if ((amount === 'all') && (force === 'f' || force === 'F')) {
                message.channel.clone({
                    name: message.channel.name,
                    permissionOverwrites: message.channel.permissionOverwrites,
                    type: 'text',
                    topic: message.channel.topic,
                    nsfw: message.channel.nsfw
                }).then(clone => {
                    clone.send('Channel cleared/cloned.');
                });
                message.channel.delete();
                return this.messageSender.reply(message, 'soemthing');
            } else {
                return this.messageSender.send(message, "Sorry that is not a valid command.");
            }
        };
    };
}