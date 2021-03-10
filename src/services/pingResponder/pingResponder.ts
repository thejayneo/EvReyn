import {Message} from 'discord.js';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import { MessageSender } from "../messageSender/messageSender";

@injectable()
export class PingResponder {
    private messageSender: MessageSender;
    
    constructor(
        @inject(TYPES.MessageSender) messageSender: MessageSender
    ) {
        this.messageSender = messageSender;
    }

    respond(message: Message) {
        return this.messageSender.reply(message, 'pong!');
    }
}