"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Recommended way of loading dotenv
require('dotenv').config();
// Import dependencies
const inversify_config_1 = require("./inversify.config");
const types_1 = require("./types");
// Initiate bot connection
let bot = inversify_config_1.default.get(types_1.TYPES.Bot);
bot.listen().then(() => {
    console.log('Log in successful.' + "\n" + 'Connected to Discord API' + "\n" + 'Awaiting input...');
}).catch((error) => {
    console.log('Oh no! ', error);
});
//# sourceMappingURL=index.js.map