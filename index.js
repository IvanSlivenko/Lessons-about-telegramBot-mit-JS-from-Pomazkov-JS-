require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard } = require('grammy');

// ---------------------------------------------- Created new Bot
const bot = new Bot(process.env.BOT_API_KEY)

bot.api.setMyCommands([
    { command: 'start', description: 'Запуск бота' },
    { command: 'hello', description: 'Отримати привітання' },
    { command: 'about', description: 'Інформація про нас' },
    { command: 'call_my', description: 'Зателефонуйте мені' },
    { command: 'mood', description: 'Настрій' },
    { command: 'fetch', description: 'Запит' },
    { command: 'one_time', description: 'Одноразові кнопки' },
    { command: 'remove_buttons', description: 'Кнопки зі зникненням' },
    { command: 'created_buttons', description: 'Список кнопок' },
    { command: 'share', description: 'Кастомні кнопки' },
    { command: 'inline_keyboard', description: 'Онлайн кнопки' },
    { command: 'inline_keyboard_two', description: 'Онлайн кнопки 2' },


])
// -------------------------------------------- bot.command
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

// ---------------------------------------------------------------- mood
bot.command('mood', async (ctx) => {
    const moodKeyboard = new Keyboard().text('Гарний настрій').row().text('Нормальний настрій').row().text('Поганий настрій').resized()
    await ctx.reply('Який у вас настрій', {
        reply_markup: moodKeyboard
    }
    )
})

bot.hears('Гарний настрій', async (ctx) => {
    await ctx.reply('Це добре')

})

// --------------------------------------------------------- fetch
bot.command('fetch', async (ctx) => {
    const fetchKeyboard = new Keyboard().text('Асортимент').row().text('Контакти').text('Про компанію')
    await ctx.reply('Що вас зацікавило', {
        reply_markup: fetchKeyboard
    }
    )
})

bot.hears('Асортимент', async (ctx) => {
    await ctx.reply('<a class="tg-spoiler" href="https://bud-express.in.ua/categories/d48c9976-24ce-49ff-96fd-2bf5f5e9bd31">\
        Детальніше</a>', {
        parse_mode: 'HTML'
    })

})

bot.command('one_time', async (ctx) => {
    const fetchKeyboard = new Keyboard().text('Асортимент').row().text('Контакти').text('Про компанію').oneTime()
    await ctx.reply('Що вас зацікавило', {
        reply_markup: fetchKeyboard
    }
    )
})

// ---------------------------------------------------- remove buttons
bot.command('remove_buttons', async (ctx) => {
    const fetchKeyboard = new Keyboard().text('Товари').row().text('Контакти').text('Про компанію')
    await ctx.reply('Що вас зацікавило', {
        reply_markup: fetchKeyboard
    }
    )
})

bot.hears('Товари', async (ctx) => {
    await ctx.reply('Пропонуємо наш асортимент', {
        reply_markup: { remove_keyboard: true }
    })

})

// ---------------------------------------------------------- bot. hears ()

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

bot.hears([/react/], async (ctx) => {
    await ctx.reply('Вас вітає *Покрівля та фасад* _Кропивницького_ [Деталі\\.\\.\\.]\
        \\(https://bud\\-express\\.in\\.ua/categories/d48c9976\\-24ce\\-49ff\\-96fd\\-2bf5f5e9bd31\\)', {
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true
    })
    await ctx.react('👍')
})

// --------------------------------------------------------------- created Buttons from array

bot.command('created_buttons', async (ctx) => {

    const buttonLabels = [
        'Вікна',
        'Двері',
        'Паркани',
        'Фасадні фарби'
    ]

    const rows = buttonLabels.map((label) => {
        return [
            Keyboard.text(label)
        ]
    })

    const goodsKeyboard = Keyboard.from(rows).resized()

    await ctx.reply('Що вас зацікавило', {
        reply_markup: goodsKeyboard
    }
    )
})


// ------------------------------------------------------------------------------------------- custome keyboad

//----------------------------------------------------------------- request location , Contact, Poll
bot.command('share', async (ctx) => {
    const shareKeyboard = new Keyboard().requestContact('Геолокація').requestContact('Контакт')
        .row().requestPoll('Опитування для Статистики')
        .row().requestPoll('Опитування для Вікторини').placeholder('Оберіть варіант данних')
        .resized()

    await ctx.reply('Пропонуємо обрати', {
        reply_markup: shareKeyboard
    })
})

//--------------------------------------------------------------- filter fetch

bot.on(':contact', async (ctx) => {
    await ctx.reply('Дякуємо за контакт ?')
})

// ------------------------------------------------------------------------------------- inline keyboard
bot.command('inline_keyboard', async (ctx) => {
    const inlineKeyboard = new InlineKeyboard()
        .text('1', 'button-1')
        .text('2', 'button-2')
        .text('3', 'button-3')

    await ctx.reply('Оберіть цифру', {
        reply_markup: inlineKeyboard
    })
})

bot.callbackQuery(['button-1', 'button-2', 'button-3'], async (ctx) => {
    await ctx.answerCallbackQuery('Ви обрали цифру !!!')
    await ctx.reply('Ви обрали цифру')
})

//------------------------------------------------------------------------------ inline keyboard Two ( get Data)
bot.command('inline_keyboard_two', async (ctx) => {
    const inlineKeyboardTwo = new InlineKeyboard()
        .text('4', 'button-4')
        .text('5', 'button-5')
        .text('6', 'button-6')

    await ctx.reply('Оберіть цифру', {
        reply_markup: inlineKeyboardTwo
    })
})

bot.on('callback_query:data', async (ctx) => {
    await ctx.answerCallbackQuery()
    await ctx.reply(`Ви натиснули на кнопку: ${ctx.callbackQuery.data}`)
})

//------------------------------------------------------------------------------ inline keyboard Thry
// bot.callbackQuery(['button-1', 'button-2', 'button-3'], async (ctx) => {
//     await ctx.answerCallbackQuery('Ви обрали цифру !!!')
//     await ctx.reply('Ви обрали цифру')
// })

// ------------------------------------------------------------ ErrorHandler

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

// ----------------------------------------------------------------- Start
bot.start();





