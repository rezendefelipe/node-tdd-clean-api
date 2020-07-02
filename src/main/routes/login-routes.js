const loginRouter = require('../composers/login-router-composer')
const ExpressRouteAdapter = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/login', ExpressRouteAdapter.adapt(loginRouter))
}
