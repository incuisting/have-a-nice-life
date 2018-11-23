const axios = require('axios')

const option = {
  method: 'post',
  url: 'https://superapp.kiwa-tech.com/app/submitQueue',
  headers: {
    Cookie:
      '_HAIDILAO_APP_TOKEN=TOKEN_APP_4447d075-a536-4fae-a9cc-30218a45292b; acw_tc=65c86a0b15414856359658636e7f5baf4bb4d659c6e4f648f765655fd84268',
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92 MicroMessenger/6.7.3(0x16070321) NetType/WIFI Language/zh_CN',
    Connection: 'keep-alive',
    'Accept-Language': 'zh-cn',
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json'
  },
  data: {
    _HAIDILAO_APP_TOKEN: 'TOKEN_APP_4447d075-a536-4fae-a9cc-30218a45292b',
    customerId: 'n-8545739',
    storeId: '041501',
    storeName: '银泰城店',
    title: '1',
    peopleNum: 4
  }
}

axios.request(option).then(
  res => {
    console.log(res.data)
  },
  err => {
    console.error(err)
  }
)
