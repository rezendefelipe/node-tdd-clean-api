const MongoHelper = require('../helpers/mongo-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')
const UpdadeAccessTokenRepository = require('./update-access-token-repository')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdadeAccessTokenRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('UpdateAccessToken Repository Validator', () => {
  let fakeUserId
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    const userModel = db.collection('users')
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@email.com',
      password: 'hased_password',
      name: 'fake_name',
      age: 50
    })
    fakeUserId = fakeUser.ops[0]._id
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()

    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUserId })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no usermodel is provided', async () => {
    const sut = new UpdadeAccessTokenRepository()
    const promise = sut.update(fakeUserId, 'valid_token')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    const { sut } = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    const promise = sut.update(fakeUserId)
    expect(promise).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
