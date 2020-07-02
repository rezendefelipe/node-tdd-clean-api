const sut = require('./mongo-helper')

describe('MongoHelper Validator', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconect when getColletion() is invoked and client is disconnected', async () => {
    expect(sut.db).toBeTruthy()
    await sut.disconnect()
    expect(sut.db).toBeFalsy()
    await sut.getColletion('users')
    expect(sut.db).toBeTruthy()
  })
})
