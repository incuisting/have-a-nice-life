const request = require('request')
function fetch(option) {
  return new Promise((resolve, reject) => {
    request(option, (error, res, body) => {
      resolve(res)
    })
  })
}

module.exports = {
  fetch
}
