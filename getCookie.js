const axios = require('axios')

async function getCookie(url) {
  let option = { url: url }
  let { headers } = await axios.request(option)
  return headers['set-cookie']
  // return [
  //   'acw_tc=65c86a0b15414856359658636e7f5baf4bb4d659c6e4f648f765655fd84268;'
  // ]
}
module.exports = {
  getCookie
}
