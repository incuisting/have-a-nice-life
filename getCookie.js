const axios = require('axios')

async function getCookie(url) {
  let option = { url: url }
  let { headers } = await axios.request(option)
  return headers['set-cookie']
}
module.exports = {
  getCookie
}
