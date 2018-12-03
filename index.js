const { initSubmitQueue } = require('./utils')
const { logger } = require('./log')
const { data: authData } = require('./auth.json')
//TODO
//直接采用文件中读取auth的方式
//包装promise 之后直接发送
async function main() {
  let allQueue = initSubmitQueue(authData)
  let result = await Promise.all(allQueue)
  logger.info(JSON.stringify(result))
}
module.exports = {
  main
}
