import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
'217158512549931', 
'207237071036575',
'222514370359475', 
''
] 

global.mods = []
global.prems = []

global.emoji = '📎'
global.emoji2 = '🏞️'
global.namebot = '𝐕𝐈𝐏 𝐁𝐎𝐓 𝐒𝐔𝐏𝐑𝐄𝐌𝐎'
global.botname = '𝐕𝐈𝐏 𝐁𝐎𝐓 𝐒𝐔𝐏𝐑𝐄𝐌𝐎'
global.banner = 'https://files.catbox.moe/igdrbi.jpg'
global.packname = '𝐕𝐈𝐏 𝐁𝐎𝐓 𝐒𝐔𝐏𝐑𝐄𝐌𝐎'
global.author = '𝖣𝖾𝗌𝖺𝗋𝗅𝗅𝖺𝖽𝗈 𝗉𝗈𝗋 SANTOS'
global.sessions = '𝐕𝐈𝐏 𝐁𝐎𝐓 𝐒𝐔𝐏𝐑𝐄𝐌𝐎'

global.APIs = {
sky: 'https://api-sky.ultraplus.click',
may: 'https://mayapi.ooguy.com'
}

global.APIKeys = {
sky: 'Angxlllll',
may: 'may-0595dca2'
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Se actualizó el 'config.js'"))
import(`file://${file}?update=${Date.now()}`)
})