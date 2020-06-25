const { MissingParamError } = require('../../utils/errors/index')

class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
  }
}

describe('Auth Use Case', () => {
  test('Shoud throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promisse = sut.auth()
    expect(promisse).rejects.toThrow(new MissingParamError('email'))
  })
})
