"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSender = void 0;
const inversify_1 = require("inversify");
let MessageSender = class MessageSender {
    send(message, messageContent) {
        return message.channel.send(message.author.tag + ' ' + messageContent);
    }
    reply(message, messageContent) {
        return message.reply(messageContent);
    }
};
MessageSender = __decorate([
    inversify_1.injectable()
], MessageSender);
exports.MessageSender = MessageSender;
//# sourceMappingURL=messageSender.js.map