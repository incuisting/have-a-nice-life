function headerBuilder(api, body, cookie = null) {
  let res = {
    method: 'POST',
    url: `https://superapp.kiwa-tech.com/${api}`,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92 MicroMessenger/6.7.3(0x16070321) NetType/WIFI Language/zh_CN',
      Connection: 'keep-alive',
      'Accept-Language': 'zh-cn',
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json'
    },
    body: body,
    json: true
  }
  if (cookie) {
    res.headers['Cookie'] = cookie
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
  return `_HAIDILAO_APP_TOKEN=${token};  ${browserCookie.join().split(';')[0]}`
}

module.exports = {
  headerBuilder,
  cookieHandle
}
