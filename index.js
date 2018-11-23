const { fetch, initSubmitQueue, getAuth } = require('./utils')
const { data } = require('./userInfo')
const { headerBuilder } = require('./requestInfo')

async function main() {
  let allQueue = initSubmitQueue(data)
  let {
    body: {
      data: { id: customerId, token }
    }
  } = await getAuth('oKNukjhsMYqMEW6KMJZdmiciI1O8')
  let getStoreApiBody = {
    _HAIDILAO_APP_TOKEN: token,
    customerId: customerId,
    storeId: '091401' //5050店
  }
  let count = 0
  let timeOut = setInterval(async function() {
    let {
      body: {
        data: { webQueue }
      }
    } = await fetch(headerBuilder('app/getStoreById', getStoreApiBody))
    if (webQueue) {
      let result = await Promise.all(allQueue)
      console.log(result.data)
      clearInterval(timeOut)
    }
    if (count > 50) {
      clearInterval(timeOut)
    }
    console.log('webq:', webQueue, 'count:', count)
    count++
  }, 666)
}
main()
