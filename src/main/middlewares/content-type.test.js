const request = require('supertest')
const app = require('../config/app')
describe('Content type test middleware', () => {
  test('Should return json content type as default', async () => {
    app.get('/test_content-type', (req, res) => {
      res.send('')
    })
    await request(app).get('/test_content-type').expect('content-type', /json/)
  })

  test('Should return xml content type if requested', async () => {
    app.get('/test_content-type-xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app).get('/test_content-type-xml').expect('content-type', /xml/)
  })
})
