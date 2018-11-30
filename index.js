const { fetch, initSubmitQueue, getAuth } = require('./utils')
const { data, storeId } = require('./userInfo')
const { headerBuilder } = require('./requestInfo')
const { logger } = require('./log')

function filterSuccess(resultArray, promiseArray) {
  let res = []
  resultArray.forEach((item, idx) => {
    if (!item.body.success) {
      res.push(promiseArray[idx])
    }
  })
  return res
}
function isContinue(reFetch1, reFetch2) {
  if (reFetch1.length === 0) {
    return false
  }
  if (reFetch2.length === 0) {
    return false
  }
  return true
}
async function main() {
  let allQueue1 = initSubmitQueue(data, '1')
  let allQueue2 = initSubmitQueue(data, '2')
  let result1 = await Promise.all(allQueue1)
  let result2 = await Promise.all(allQueue2)
  let reFetch1 = filterSuccess(result1, allQueue1)
  let reFetch2 = filterSuccess(result2, allQueue2)
  let queueStatus = isContinue(reFetch1, reFetch2)
  logger.info(result1, result2)
  // console.log(result1, result2)
  while (queueStatus) {
    result1 = await Promise.all(reFetch1)
    result2 = await Promise.all(reFetch2)
    reFetch1 = filterSuccess(result1, allQueue1)
    reFetch2 = filterSuccess(result2, allQueue2)
    queueStatus = isContinue(reFetch1, reFetch2)
    logger.info(result1, result2)
    // console.log(result1, result2)
  }
}

main()
// module.exports = {
//   main
// }
