function headerBuilder(api, body) {
  return {
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
}

module.exports = {
  headerBuilder
}
