const { fetch } = require('./utils')
const { data } = require('./userInfo')
const { headerBuilder } = require('./requestInfo')
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
  } = await fetch(
    headerBuilder('app/getUnionId', { openid: 'oKNukjhsMYqMEW6KMJZdmiciI1O8' })
  )
  let thirdLoginBody = { uid: unionid, type: 1, country: 'CN' }
  let {
    body: {
      data: { id, token }
    }
  } = await fetch(headerBuilder('login/thirdLogin', thirdLoginBody))
  console.log(id, token)
}

submitQueue()
function main() {
  let count = 0
  let timeOut = setInterval(function() {
    count++
    console.log(count)
    if (count > 4) {
      clearInterval(timeOut)
    }
  }, 1000)
}
// main()
