const loginRouterComposer = require('../composers/login-router-composer')
const ExpressRouteAdapter = require('../adapters/express-router-adapter')

module.exports = router => {
  const loginRouter = loginRouterComposer.compose()
  router.post('/login', ExpressRouteAdapter.adapt(loginRouter))
}
