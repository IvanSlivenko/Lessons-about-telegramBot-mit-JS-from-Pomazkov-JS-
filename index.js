require('dotenv').config();
const { Bot, GrammyError, HttpError } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY)

bot.api.setMyCommands([
    { command: 'start', description: 'Запуск бота' },
    { command: 'hello', description: 'Отримати привітання' },
    { command: 'about', description: 'Інформація про нас' },
    { command: 'call_my', description: 'Зателефонуйте мені' }

])

bot.command('start', async (ctx) => {
    await ctx.reply('Вас вітає Покрівля та фасасд Кропивницького')
})

// bot.on('message', async (ctx) => {
//     await ctx.reply('Тут пізніше буде Повідомлення')
// });



bot.command(['say_hello', 'hello', 'say_hi'], async (ctx) => {
    await ctx.reply('Hello!')
})

bot.command(['call_my'], async (ctx) => {
    await ctx.reply('Доброго дня, ваша замовлення прийняте, ми вам  зателефонуємо протягом 15 хв. Дякуємо за цікавсть до нашої компанії.')
})



bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Помилка ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error("Error in request", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e.description);
    } else {
        console.error("Unknown error", e);
    }




})

bot.start();





