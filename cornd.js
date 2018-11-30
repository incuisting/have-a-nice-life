const { CronJob } = require('cron')
const { main } = require('./index')
const job = new CronJob('0 0 8,16 * * *', function() {
  main()
})
job.start()
