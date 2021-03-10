// Recommended way of loading dotenv
require('dotenv').config();
// Import dependencies
import container from "./inversify.config";
import {TYPES} from "./types";
import {Bot} from "./bot";
// Initiate bot connection
let bot = container.get<Bot>(TYPES.Bot);
bot.listen().then(() => {
  console.log('Log in successful.'+"\n"+'Connected to Discord API'+"\n"+'Awaiting input...')
}).catch((error) => {
  console.log('Oh no! ', error)
});