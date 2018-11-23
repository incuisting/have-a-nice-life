const request = require('request')
const { headerBuilder, cookieHandle } = require('./requestInfo')
const { getCookie } = require('./getCookie')

async function getAuth(openid) {
  let {
    body: {
      data: { unionid }
    }
  } = await fetch(headerBuilder('app/getUnionId', { openid }))
  let thirdLoginBody = { uid: unionid, type: 1, country: 'CN' }
  let res = await fetch(headerBuilder('login/thirdLogin', thirdLoginBody))
  return res
}

async function submitQueue(openid, peopleNum, browserCookie) {
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
    title: '1',
    peopleNum: peopleNum
  }
  let cookie = `_HAIDILAO_APP_TOKEN=${token};  ${browserCookie}`
  let res = await fetch(headerBuilder('app/submitQueue', queueBody, cookie))
  return res
}

function fetch(option) {
  return new Promise((resolve, reject) => {
    request(option, (error, res, body) => {
      resolve({ body })
    })
  })
}

function initSubmitQueue(data) {
  return data.map(({ openid, peopleNum, cookie }) =>
    submitQueue(openid, peopleNum, cookie)
  )
}
module.exports = {
  fetch,
  initSubmitQueue,
  getAuth
}
