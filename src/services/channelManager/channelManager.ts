import {Channel, Client, Guild, GuildChannel, GuildCreateChannelOptions, Message, TextChannel} from 'discord.js';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import { MessageSender } from '../messageSender/messageSender';

@injectable()
export class ChannelManager {
    private messageSender: MessageSender;
    constructor(
        @inject(TYPES.MessageSender) messageSender: MessageSender
    ) {
        this.messageSender = messageSender
    }

    create(message: Message, 
        name: string, 
        channelType: "text" | "news" | "voice" | "category" | "store" | ChannelType.text | ChannelType.voice | ChannelType.category | ChannelType.news | ChannelType.store, 
        nsfwStatus: boolean = false): Promise<Message> {
        if (message.channel.type === 'text') {
                message.guild.channels.create(
                    name, {
                        type: channelType,
                        nsfw: nsfwStatus,
                        permissionOverwrites: message.channel.permissionOverwrites
                    }
                )
        // This else block is inaccessible as bot only listens to guild text channels but is needed for permissionOverwrites.
        } else {
            return this.messageSender.reply(message, 'invalid command.')
        }
        return this.messageSender.reply(message, 'specified channel has been created.')
    };

    delete(message: Message): Promise<Message> {
        return
    };

    clone(message: Message): Promise<Message> {
        if (message.channel.type != 'dm') {
            message.channel.clone({
                name: message.channel.name,
                permissionOverwrites: message.channel.permissionOverwrites,
                type: message.channel.type,
                topic: message.channel.topic,
                nsfw: message.channel.nsfw
            }).then()
        }
        return 
    }
}