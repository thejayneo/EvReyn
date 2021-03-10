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
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const CommandRouter_1 = require("./services/CommandRouter/CommandRouter");
let Bot = class Bot {
    constructor(client, token, CommandRouter) {
        this.client = client;
        this.token = token;
        this.CommandRouter = CommandRouter;
        this.triggerChar = '!';
    }
    // Initiate bot listening for messages
    listen() {
        this.client.on('message', (message) => {
            // Ignore messages without command trigger and private messages
            if (!message.content.startsWith(this.triggerChar) || !message.guild) {
                return;
            }
            // Ignore messages from bots (self & others)
            if (message.author.bot) {
                console.log("Message <Bot: " + message.author.username + ">: Message ignored.");
                return;
            }
            // Log user messages
            console.log("Message <" + message.author.username + "#" + message.author.discriminator + ">:", message.content);
            // Pass to listener service
            this.CommandRouter.handle(message).then(() => {
                console.log("Response sent!");
            }).catch(() => {
                console.log("Response not sent.");
            });
        });
        return this.client.login(this.token);
    }
};
Bot = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Client)),
    __param(1, inversify_1.inject(types_1.TYPES.Token)),
    __param(2, inversify_1.inject(types_1.TYPES.CommandRouter)),
    __metadata("design:paramtypes", [discord_js_1.Client, String, CommandRouter_1.CommandRouter])
], Bot);
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map