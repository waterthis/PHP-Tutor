const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf("6279553839:AAHdcfjHJ0Wv3KjFP_IEgxJSCwglqv9S3xA");

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// // AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
// exports.handler = async (event) => {
//   try {
//     await bot.handleUpdate(JSON.parse(event.body));
//     return { statusCode: 200, body: "" };
//   } catch (e) {
//     console.error("error in handler:", e);
//     return {
//       statusCode: 400,
//       body: "This endpoint is meant for bot and telegram communication",
//     };
//   }
// };
