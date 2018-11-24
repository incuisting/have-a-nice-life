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

async function submitQueue(openid, peopleNum, url, title) {
  let {
    body: {
      data: { id: customerId, token }
    }
  } = await getAuth(openid)
  let queueBody = {
    _HAIDILAO_APP_TOKEN: token,
    customerId: customerId,
    storeId: storeId,
    storeName: storeName,
    title: title,
    peopleNum: peopleNum
  }
  let browserCookie = await getCookie(url)
  let cookie = cookieHandle(token, browserCookie)
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

function initSubmitQueue(data, title) {
  return data.map(({ openid, peopleNum, url, cookie }) =>
    submitQueue(openid, peopleNum, url, title)
  )
}
module.exports = {
  fetch,
  initSubmitQueue,
  getAuth
}
