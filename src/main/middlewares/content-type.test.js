const request = require('supertest')

describe('Content type test middleware', () => {
  let app

  beforeEach(() => {
    jest.resetModules()
    app = require('../config/app')
  })

  test('Should return json content type as default', async () => {
    app.get('/test_content-type', (req, res) => {
      res.send('')
    })
    await request(app).get('/test_content-type').expect('content-type', /json/)
  })

  test('Should return xml content type if requested', async () => {
    app.get('/test_content-type', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app).get('/test_content-type').expect('content-type', /xml/)
  })
})
