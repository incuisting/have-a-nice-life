const { fetch, initSubmitQueue, getAuth } = require('./utils')
const { data, storeId } = require('./userInfo')
const { headerBuilder } = require('./requestInfo')
const { logger } = require('./log')
//TODO
//直接采用文件中读取auth的方式
//包装promise 之后直接发送
async function main() {
  let allQueue1 = initSubmitQueue(data, '1')
  let allQueue2 = initSubmitQueue(data, '2')
  let result1 = await Promise.all(allQueue1)
  let result2 = await Promise.all(allQueue2)
  logger.info(result1, result2)
}

module.exports = {
  main
}
