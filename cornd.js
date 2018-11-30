const { CronJob } = require('cron')
const { main, getAuthData } = require('./index')
const job = [
  new CronJob('0,1,2,3,4,5,6,7,8,9,10 0 8,16 * * *', function() {
    main()
  }),
  new CronJob('0 50 7,15 * * *', function() {
    getAuthData()
  })
]
job.forEach(item => item.start())
