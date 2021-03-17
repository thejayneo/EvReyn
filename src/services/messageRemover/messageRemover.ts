import { Message } from 'discord.js';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {MessageSender} from "../messageSender/messageSender";
import {ChannelManager} from "../channelManager/channelManager";

@injectable()
export class MessageRemover {
    private messageSender: MessageSender;
    private channelManager: ChannelManager;
    
    constructor(
        @inject(TYPES.MessageSender) messageSender: MessageSender,
        @inject(TYPES.ChannelManager) channelManager: ChannelManager
    ) {
        this.messageSender = messageSender;
        this.channelManager = channelManager;
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
                this.channelManager.clone(message);
                this.channelManager.delete(message);
                return this.messageSender.reply(message, 'Channel cleared.');
            } else {
                return this.messageSender.send(message, "Sorry that is not a valid command.");
            }
        };
    };
}