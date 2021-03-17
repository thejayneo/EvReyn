"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelManager = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const messageSender_1 = require("../messageSender/messageSender");
let ChannelManager = class ChannelManager {
    constructor(messageSender) {
        this.messageSender = messageSender;
    }
    create(message, name, channelType, nsfwStatus = false) {
        if (message.channel.type === 'text') {
            message.guild.channels.create(name, {
                type: channelType,
                nsfw: nsfwStatus,
                permissionOverwrites: message.channel.permissionOverwrites,
                parent: message.channel.parent
            });
            // This else block is inaccessible as bot only listens to guild text channels but is needed for permissionOverwrites.
        }
        else {
            return this.messageSender.reply(message, 'invalid command.');
        }
        return this.messageSender.reply(message, 'specified channel has been created.');
    }
    ;
    delete(message) {
        message.channel.delete();
        return this.messageSender.send(message, 'channel deleted.');
    }
    ;
    clone(message) {
        if (message.channel.type != 'dm') {
            message.channel.clone({
                name: message.channel.name,
                permissionOverwrites: message.channel.permissionOverwrites,
                type: message.channel.type,
                topic: message.channel.topic,
                nsfw: message.channel.nsfw
            });
            return this.messageSender.reply(message, 'channel cloned.');
        }
    }
};
ChannelManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.MessageSender)),
    __metadata("design:paramtypes", [messageSender_1.MessageSender])
], ChannelManager);
exports.ChannelManager = ChannelManager;
//# sourceMappingURL=channelManager.js.map