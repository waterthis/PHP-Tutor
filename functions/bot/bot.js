const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN2);

bot.start((ctx) => {
  console.log("Received /start command");
  try {
    ctx.reply("Congrats! You've connected to Netlify!");
  } catch (e) {
    console.error("error in start action:", e);
    ctx.reply("Error occured");
  }
});

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
