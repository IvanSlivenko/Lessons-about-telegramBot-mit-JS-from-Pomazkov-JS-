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
    await ctx.reply('Вас вітає Покрівля та фасад Кропивницького')
})

// bot.command('start', async (ctx) => {
//     await ctx.reply('Вас вітає Покрівля та фасад Кропивницького', {
//         reply_parameters: { message_id: ctx.msg.message_id }
//     })
// })

// bot.command('start', async (ctx) => {
//     await ctx.reply('Вас вітає Покрівля та фасад Кропивницького.  <a href="https://bud-express.in.ua/categories/d48c9976-24ce-49ff-96fd-2bf5f5e9bd31">Детальніше</a>', {
//         parse_mode: 'HTML'
//     })
// })

bot.command(['say_hello', 'hello', 'say_hi'], async (ctx) => {
    await ctx.reply('Hello!')
})

bot.command(['about'], async (ctx) => {
    await ctx.reply('Інформація про компанію.')
})

bot.command(['call_my'], async (ctx) => {
    await ctx.reply('Доброго дня, ваша замовлення прийняте, ми вам  зателефонуємо протягом 15 хв. Дякуємо за цікавсть до нашої компанії.')
})


// bot.on('message', async (ctx) => {
//     await ctx.reply('Тут пізніше буде Повідомлення')
// });

// bot.on('message:entities:url', async (ctx) => {
//     await ctx.reply('Тут пізніше буде відповідь на URL')
// });

// bot.on('::url', async (ctx) => {
//     await ctx.reply('Тут пізніше буде відповідь на URL')
// });

// bot.on('msg').filter((ctx) => {
//     return ctx.from.id !== 252525
// }, async (ctx) => {
//     await ctx.reply('Ваш id не дорівнює 252525')
// })

// bot.on('message:text', async (ctx) => {
//     await ctx.reply('Тут пізніше буде відповідь на текстовий запит')
// });

// bot.on(':photo').on('::hashtag', async (ctx) => {
//     await ctx.reply('Тут пізніше буде відповідь на :photo чи :hashtag ')
// })

// bot.on([':media', ':photo'], async (ctx) => {
//     await ctx.reply('Тут пізніше буде відповідь на запит-media чи фото')
// });

// bot.on('message:photo', async (ctx) => {
//     await ctx.reply('Тут пізніше буде відповідь на запит-картинку')
// });

// bot.on(':voice', async (ctx) => {
//     await ctx.reply('Тут пізніше буде відповідь на голосове повідомлення')
// });

bot.hears('вікно', async (ctx) => {
    await ctx.reply('так вікна продаємо')
})

bot.hears('профіль', async (ctx) => {
    await ctx.reply('так профіль продаємо')
})

bot.hears(['сайдинг', 'водосток'], async (ctx) => {
    await ctx.reply('асортимент складу пластику')
})

bot.hears([/хрінь/, /фігня/], async (ctx) => {
    await ctx.reply('ви вжаваєте нецензурні слова')
})

bot.hears([/саморіз/, /цвях/, /болт/], async (ctx) => {
    await ctx.reply('Пропонуємо метизи для вашого будівництва чи ремонту')
})

bot.hears([/ctx/], async (ctx) => {
    await ctx.reply('ctx sending to terminal')
    // console.log(ctx.msg)
    console.log(ctx.from)
})

bot.hears([/id/], async (ctx) => {
    await ctx.reply(`Ваш id: ${ctx.from.id}`)

})


//link
// bot.hears([/link/], async (ctx) => {
//     await ctx.reply('Вас вітає Покрівля та фасад Кропивницького.  <a href="https://bud-express.in.ua/categories/d48c9976-24ce-49ff-96fd-2bf5f5e9bd31">Детальніше</a>', {
//         parse_mode: 'HTML'
//     })

// })

bot.hears([/link/], async (ctx) => {
    await ctx.reply('Вас вітає Покрівля та фасад Кропивницького.  \
        <a class="tg-spoiler" href="https://bud-express.in.ua/categories/d48c9976-24ce-49ff-96fd-2bf5f5e9bd31">\
        Детальніше</a> <span class="tg-spoiler"> span </span>', {
        parse_mode: 'HTML'
    })

})

bot.hears([/mdv2/], async (ctx) => {
    await ctx.reply('Вас вітає *Покрівля та фасад* _Кропивницького_', {
        parse_mode: 'MarkdownV2'
    })
})

bot.hears([/ref/], async (ctx) => {
    await ctx.reply('Вас вітає *Покрівля та фасад* _Кропивницького_ [Деталі\\.\\.\\.]\
        \\(https://bud\\-express\\.in\\.ua/categories/d48c9976\\-24ce\\-49ff\\-96fd\\-2bf5f5e9bd31\\)', {
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true
    })
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





