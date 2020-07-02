const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

console.log(env)

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    app.listen(5858, () => console.log('Server runing'))
  })
  .catch(console.error)
