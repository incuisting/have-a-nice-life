const { CronJob } = require('cron')
const { main } = require('./index')
const { getAuthData } = require('./getAuth')

const job = [
  new CronJob(`* 0,1 8,16 * * *`, function() {
    main()
  }),
  new CronJob('0 50 7,15 * * *', function() {
    getAuthData()
  })
]
job.forEach(item => item.start())
