const { fetch, initSubmitQueue, getAuth } = require('./utils')
const { data, storeId } = require('./userInfo')
const { headerBuilder } = require('./requestInfo')

async function main() {
  let allQueue1 = initSubmitQueue(data, '1')
  let allQueue2 = initSubmitQueue(data, '2')
  let {
    body: {
      data: { id: customerId, token }
    }
  } = await getAuth('oKNukjhsMYqMEW6KMJZdmiciI1O8')
  let getStoreApiBody = {
    _HAIDILAO_APP_TOKEN: token,
    customerId: customerId,
    storeId: storeId
  }
  let webQueueStatus = 0
  while (!webQueueStatus) {
    let {
      body: {
        data: { webQueue }
      }
    } = await fetch(headerBuilder('app/getStoreById', getStoreApiBody))
    if (webQueue) {
      let result1 = await Promise.all(allQueue1)
      let result2 = await Promise.all(allQueue2)
      console.log(result1)
      console.log(result2)
      webQueueStatus = webQueue
    }
    console.log('webq:', webQueue)
  }
}
main()
