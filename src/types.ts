import { ChannelManager } from "discord.js";

export const TYPES = {
    Bot: Symbol("Bot"),
    Client: Symbol("Client"),
    Token: Symbol("Token"),
    CommandRouter: Symbol("CommandRouter"),
    MessageSender: Symbol("MessageSender"),
    PingResponder: Symbol("PingResponder"),
    MessageRemover: Symbol("MessageRemover"),
    ChannelManager: Symbol("ChannelManager")
  };