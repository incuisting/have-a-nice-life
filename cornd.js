const { CronJob } = require('cron')
const job = new CronJob('* 10 * * * *', function() {
  const d = new Date()
  console.log('At Ten Minutes:', d)
})
console.log('After job instantiation')
job.start()
