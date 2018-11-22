const request = require('request')
const { headerBuilder } = require('./requestInfo')

async function getAuth(openid) {
  let {
    data: { unionid }
  } = await fetch(headerBuilder('app/getUnionId', { openid }))
  let thirdLoginBody = { uid: unionid, type: 1, country: 'CN' }
  let body = await fetch(headerBuilder('login/thirdLogin', thirdLoginBody))
  return body
}

async function submitQueue(openid, peopleNum) {
  let {
    data: { id: customerId, token }
  } = await getAuth(openid)
  let queueBody = {
    _HAIDILAO_APP_TOKEN: token,
    customerId: customerId,
    storeId: '041501',
    storeName: '银泰城店',
    title: '2',
    peopleNum: peopleNum
  }
  let res = await fetch(headerBuilder('app/submitQueue', queueBody))
  return res
}

function fetch(option) {
  return new Promise((resolve, reject) => {
    request(option, (error, res, body) => {
      resolve(res.body)
    })
  })
}

function initSubmitQueue(data) {
  return data.map(({ openid, peopleNum }) => submitQueue(openid, peopleNum))
}
module.exports = {
  fetch,
  initSubmitQueue,
  getAuth
}
