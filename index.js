const { fetch } = require('./utils')
const { data } = require('./userInfo')
const { headerBuilder } = require('./requestInfo')
async function getAuth(openid) {
  let {
    body: {
      data: { unionid }
    }
  } = await fetch(headerBuilder('app/getUnionId', { openid }))
  let thirdLoginBody = { uid: unionid, type: 1, country: 'CN' }
  let { body } = await fetch(headerBuilder('login/thirdLogin', thirdLoginBody))
  return body
}
async function submitQueue(openid, peopleNum) {
  let {
    body: {
      data: { id: customerId, token }
    }
  } = await getAuth(openid)
  let queueBody = {
    _HAIDILAO_APP_TOKEN: token,
    customerId: customerId,
    storeId: '091401',
    storeName: '5050购物中心店',
    title: '2',
    peopleNum: peopleNum
  }
  let { body } = await fetch(headerBuilder('app/submitQueue', queueBody))
  return body
}

async function main() {
  let {
    data: { id: customerId, token }
  } = await getAuth('oKNukjhsMYqMEW6KMJZdmiciI1O8')
  let getStoreApiBody = {
    _HAIDILAO_APP_TOKEN: token,
    customerId: customerId,
    storeId: '091401'
  }
  let {
    body: {
      data: { webQueue }
    }
  } = await fetch(headerBuilder('app/getStoreById', getStoreApiBody))
  console.log(webQueue)
  // let webQueue = 0
  // let count = 0
  // let timeOut = setInterval(async function() {
  //   await fetch(headerBuilder('app/getStoreById', getStoreApiBody))
  //   if (count > 10) {
  //     clearInterval(timeOut)
  //   }
  //   count++
  // }, 1000)
}
main()
