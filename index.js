const { fetch } = require('./utils')
const { data } = require('./userInfo')
const getUnionId = {
  method: 'POST',
  url: 'https://superapp.kiwa-tech.com/app/getUnionId',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) > AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D257 > MicroMessenger/6.0.1 NetType/WIFI',
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  body: { openid: 'oKNukjhsMYqMEW6KMJZdmiciI1O8' },
  json: true
}
const thirdLogin = {
  method: 'POST',
  url: 'https://superapp.kiwa-tech.com/login/thirdLogin',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) > AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D257 > MicroMessenger/6.0.1 NetType/WIFI',
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  json: true
}
async function submitQueue() {
  let {
    body: {
      data: { unionid }
    }
  } = await fetch(getUnionId)
  let thirdLoginBody = { uid: unionid, type: 1, country: 'CN' }
  thirdLogin.body = thirdLoginBody
  let {
    body: {
      data: { id, token }
    }
  } = await fetch(thirdLogin)
  console.log(id, token)
}
submitQueue()
// fetch(reqOption).then(data => {
//   console.log(data.body)
// })
