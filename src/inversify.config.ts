import "reflect-metadata";
import {Client, Message} from "discord.js";
import {Bot} from "./bot";
import {Container} from "inversify";
import {TYPES} from "./types";
import {CommandRouter} from "./services/commandRouter/commandRouter";
import {MessageSender} from "./services/messageSender/messageSender";
import {PingResponder} from "./services/pingResponder/pingResponder";
import {MessageRemover} from "./services/messageRemover/messageRemover";
import {ChannelManager} from "./services/channelManager/channelManager";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<CommandRouter>(TYPES.CommandRouter).to(CommandRouter).inSingletonScope();
container.bind<MessageSender>(TYPES.MessageSender).to(MessageSender).inSingletonScope();
container.bind<PingResponder>(TYPES.PingResponder).to(PingResponder).inSingletonScope();
container.bind<MessageRemover>(TYPES.MessageRemover).to(MessageRemover).inSingletonScope();
container.bind<ChannelManager>(TYPES.ChannelManager).to(ChannelManager).inSingletonScope();

export default container;