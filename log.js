const log4js = require('log4js')
log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'info.log',
      layout: {
        type: 'pattern',
        pattern: '%r %p - %m'
      }
    }
  },
  categories: {
    default: {
      appenders: ['file'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger()
module.exports = {
  logger
}
