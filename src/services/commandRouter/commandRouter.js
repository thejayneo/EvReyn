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
exports.CommandRouter = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const pingResponder_1 = require("../pingResponder/pingResponder");
const messageRemover_1 = require("../messageRemover/messageRemover");
const channelManager_1 = require("../channelManager/channelManager");
let CommandRouter = class CommandRouter {
    constructor(pingResponder, messageRemoveer, channelManager) {
        this.pingResponder = pingResponder;
        this.messageRemover = messageRemoveer;
        this.channelManager = channelManager;
    }
    handle(message) {
        // Assign command variable to first word in message without triggerchar.
        this.contents = message.content.substring(1).split(' ');
        this.command = this.contents[0];
        // Switch-Case routing of command messages
        // Administrator level commands
        if (message.member.guild.me.hasPermission('ADMINISTRATOR')) {
            switch (this.command) {
                case 'create':
                    return this.channelManager.create(message, this.contents[1], this.contents[2], (this.contents[3] || false));
                case 'clone':
                    return this.channelManager.clone(message);
                case 'delete':
                    return this.channelManager.delete(message);
            }
            // Moderator level commands
        }
        else if (message.member.guild.me.hasPermission('MANAGE_MESSAGES'))
            switch (this.command) {
                case 'clear':
                    return this.messageRemover.remove(message, message.content.split(' ')[1], message.content.split(' ')[2]);
            }
        // General user commands
        switch (this.command) {
            case 'ping':
                return this.pingResponder.respond(message);
        }
        return Promise.reject();
    }
};
CommandRouter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.PingResponder)),
    __param(1, inversify_1.inject(types_1.TYPES.MessageRemover)),
    __param(2, inversify_1.inject(types_1.TYPES.ChannelManager)),
    __metadata("design:paramtypes", [pingResponder_1.PingResponder,
        messageRemover_1.MessageRemover,
        channelManager_1.ChannelManager])
], CommandRouter);
exports.CommandRouter = CommandRouter;
//# sourceMappingURL=CommandRouter.js.map