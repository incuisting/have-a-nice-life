const request = require('request')
const { headerBuilder, cookieHandle } = require('./requestInfo')
const { getCookie } = require('./getCookie')
const { storeId, storeName } = require('./userInfo')

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

async function submitQueue(queueBody, cookie) {
  let res = await fetch(headerBuilder('app/submitQueue', queueBody, cookie))
  return res
}

function fetch(option) {
  return new Promise((resolve, reject) => {
    request(option, (error, res, body) => {
      resolve({ body, headers: res.headers })
    })
  })
}

function initSubmitQueue(data) {
  return data.map(({ queueBody, cookie }) => submitQueue(queueBody, cookie))
}
module.exports = {
  fetch,
  initSubmitQueue,
  getAuth
}
