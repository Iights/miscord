const log = require('npmlog')

const removeAccents = require('remove-accents')
const emojiStrip = require('emoji-strip')

module.exports = (thread, sender, message) => {
  // get sender's nickname
  var nickname = thread.nicknames[message.senderID || message.author]
  log.verbose('getCleanName: nickname', nickname)

  // get thread name / user
  var name = thread.isGroup ? (thread.threadName || thread.threadID) : (nickname || sender.name)
  log.verbose('getCleanName: raw channel name', name)

  // clean name for the needs of discord channel naming
  var cleanname = emojiStrip(removeAccents(name)).trim().replace(/ /g, '-').replace(/\W-/g, '').replace(/(?![a-zA-Z0-9\-_])/g, '').toLowerCase()
  log.verbose('getCleanName: clean channel name', cleanname)

  return cleanname
}
