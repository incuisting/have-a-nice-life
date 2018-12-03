const fs = require('fs')
const { getAuth } = require('./utils')
const { data, storeId, storeName } = require('./userInfo')
const path = require('path')
const { cookieHandle } = require('./requestInfo')
const { getCookie } = require('./getCookie')
const userAuth = {
  data: []
}

async function getSingleAuthData(openid, peopleNum, url, title) {
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
  return { queueBody, cookie }
}

function getMultipleAuthData(userArray, title) {
  return userArray.map(({ openid, peopleNum, url }) => {
    return getSingleAuthData(openid, peopleNum, url, title)
  })
}

async function writeTofile() {
  let title1 = await Promise.all(getMultipleAuthData(data, '1'))
  let title2 = await Promise.all(getMultipleAuthData(data, '2'))
  userAuth.data = [...title1, ...title2]
  let json = JSON.stringify(userAuth)
  fs.writeFile(
    path.resolve(__dirname, 'auth.json'),
    json,
    'utf8',
    (err, data) => {
      console.log(err, data)
    }
  )
}
module.exports = {
  getAuthData: writeTofile
}
