const request = require('supertest')
const app = require('../config/app')
describe('Json parser middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_cors', (req, res) => {
      res.send(req.body)
    })
    await request(app).post('/test_cors')
      .send({
        name: 'Felipe'
      })
      .expect({
        name: 'Felipe'
      })
  })
})
