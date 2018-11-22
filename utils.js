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
    storeId: '041501',
    storeName: '银泰城店',
    title: '2',
    peopleNum: peopleNum
  }
  let cookie = `${token};  ${browserCookie}`
  console.log('cookie', cookie)
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
  return data.map(({ openid, peopleNum, cookie }) =>
    submitQueue(openid, peopleNum, cookie)
  )
}
module.exports = {
  fetch,
  initSubmitQueue,
  getAuth
}
