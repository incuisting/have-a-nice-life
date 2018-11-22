const { fetch, initSubmitQueue, getAuth } = require('./utils')
const { data } = require('./userInfo')
const { headerBuilder } = require('./requestInfo')

async function main() {
  let allQueue = initSubmitQueue(data)
  let {
    data: { id: customerId, token }
  } = await getAuth('oKNukjhsMYqMEW6KMJZdmiciI1O8')
  let getStoreApiBody = {
    _HAIDILAO_APP_TOKEN: token,
    customerId: customerId,
    storeId: '041501' //5050店
  }
  let count = 0
  let timeOut = setInterval(async function() {
    let {
      data: { webQueue }
    } = await fetch(headerBuilder('app/getStoreById', getStoreApiBody))
    if (webQueue) {
      let result = await Promise.all(allQueue)
      console.log(result)
      clearInterval(timeOut)
    }
    if (count > 60) {
      clearInterval(timeOut)
    }
    count++
  }, 666)
}
main()
