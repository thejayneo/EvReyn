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
exports.MessageRemover = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const messageSender_1 = require("../messageSender/messageSender");
const channelManager_1 = require("../channelManager/channelManager");
let MessageRemover = class MessageRemover {
    constructor(messageSender, channelManager) {
        this.messageSender = messageSender;
        this.channelManager = channelManager;
    }
    remove(message, amount, force = null) {
        const amountAsNumber = parseInt(amount);
        // Channel type check enables use of TextChannel bulkDelete method below
        if (message.channel.type === 'text') {
            // Check if valid amount is provided
            if (amount === undefined || amountAsNumber <= 0) {
                return this.messageSender.reply(message, "you didn't provide a valid amount of messages to clear!");
                // Execute function if amount <= 100
            }
            else if (amountAsNumber <= 100) {
                message.channel.bulkDelete(amountAsNumber, false);
                return this.messageSender.reply(message, 'I have cleared ' + amount + ' messages.');
                // Create loop to handle bulk delete for 100 < amount <= 1000.
            }
            else if ((amountAsNumber > 100) && (amountAsNumber <= 1000)) {
                const fullLoops = Math.floor(amountAsNumber / 100);
                const remainder = amountAsNumber - (fullLoops * amountAsNumber);
                let counter = 0;
                while (counter < fullLoops) {
                    message.channel.bulkDelete(100, false);
                    counter++;
                }
                message.channel.bulkDelete(remainder, false);
                return this.messageSender.reply(message, 'I have cleared ' + amount + ' messages.');
                // Check for force flag when asking to delete all messages.
            }
            else if ((amount === 'all') && !force) {
                return this.messageSender.reply(message, 'you attempted to delete all messages in the channel without force. See help for more details.');
                // Loop delete for > 1000 potentially resource intensive. Clone channel, delete old channel, rename clone to name of old channel and post completion message in new channel.
            }
            else if ((amount === 'all') && (force === 'f' || force === 'F')) {
                this.channelManager.clone(message);
                this.channelManager.delete(message);
                return this.messageSender.reply(message, 'Channel cleared.');
            }
            else {
                return this.messageSender.send(message, "Sorry that is not a valid command.");
            }
        }
        ;
    }
    ;
};
MessageRemover = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.MessageSender)),
    __param(1, inversify_1.inject(types_1.TYPES.ChannelManager)),
    __metadata("design:paramtypes", [messageSender_1.MessageSender,
        channelManager_1.ChannelManager])
], MessageRemover);
exports.MessageRemover = MessageRemover;
//# sourceMappingURL=messageRemover.js.map