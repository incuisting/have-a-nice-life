function headerBuilder(api, body, cookie = null) {
  let res = {
    method: 'POST',
    url: `https://superapp.kiwa-tech.com/${api}`,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) > AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D257 > MicroMessenger/6.0.1 NetType/WIFI',
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: body,
    json: true
  }
  if (cookie) {
    res.Cookie = cookie
    return res
  }
  return res
}
/**
 * 
 *[ 'acw_tc=7b39758315428844019865482eed103e73483edd8a3614994df7da860ddd45;path=/;HttpOnly;Max-Age=2678401',
     '_HAIDILAO_APP_TOKEN=TOKEN_APP_9e2b871e-28a2-430f-969e-d1fed31b1efb; Path=/' ],
 *  */
function cookieHandle(token, browserCookie) {
  console.log('browserCookie', browserCookie)
  let cookeiArray = [
    token,
    `${browserCookie[0].name}=${browserCookie[0].value}`
  ]
  return cookeiArray.join('; ')
}

module.exports = {
  headerBuilder,
  cookieHandle
}
