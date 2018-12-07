const { CronJob } = require('cron')
const { main } = require('./index')
const { getAuthData } = require('./getAuth')

const job = [
  new CronJob('* 0 16 * * *', function() {
    main()
  }),
  new CronJob('0 50 7,15 * * *', function() {
    getAuthData()
    console.log('time', new Date().toLocaleString())
  })
]
job.forEach(item => item.start())
