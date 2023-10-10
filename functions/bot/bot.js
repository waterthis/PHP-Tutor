require("dotenv").config({ path: "../../.env" });

const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

// for deployment
const bot = new Telegraf(process.env.BOT_TOKEN);

/**********************************
  for local testing 
*********************************/
// const bot = new Telegraf(process.env.TEST_BOT_TOKEN);

// start command 
const start_command = require("../../src/commands/start")
start_command(bot)

// help command 
const help_command = require("../../src/commands/help")
help_command(bot)

// kanye command 
const kanye_command = require("../../src/commands/kanye")
kanye_command(bot)

bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

function start_bot() {
    try {
      console.log("Bot is running");
      bot.launch();
      // Enable graceful stop
      process.once("SIGINT", () => bot.stop("SIGINT"));
      process.once("SIGTERM", () => bot.stop("SIGTERM"));
    } catch (error) {
      console.log("An Error Ocurred.");
      console.log("Restarting Bot");
      start_bot()
    }
}

/**********************************
  start bot is for local testing 
*********************************/

// start_bot()

exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};
