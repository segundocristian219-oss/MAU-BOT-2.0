import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
'217158512549931', 
'207237071036575',
'94949529878655', 
''
] 

global.mods = []
global.prems = []

global.emoji = '📎'
global.emoji2 = '🏞️'
global.namebot = '𝑺𝑾Λ𝜯ㅤ𝜝𝜣𝜯'
global.botname = '𝑺𝑾Λ𝜯ㅤ𝜝𝜣𝜯'
global.banner = 'https://files.catbox.moe/d3w9ym.jpg'
global.packname = '𝑺𝑾Λ𝜯ㅤ𝜝𝜣𝜯'
global.author = '𝖣𝖾𝗌𝖺𝗋𝗅𝗅𝖺𝖽𝗈 𝗉𝗈𝗋 MAU'
global.sessions = '𝑺𝑾Λ𝜯ㅤ𝜝𝜣𝜯'

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