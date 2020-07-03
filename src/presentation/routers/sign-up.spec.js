const SignUp = require('./sign-up')
const { ServerError } = require('../errors')
const { MissingParamError } = require('../../utils/errors/index')

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    isValid (email) {
      this.email = email
      return this.isEmailValid
    }
  }
  const emailValidatorSpy = new EmailValidatorSpy()
  emailValidatorSpy.isEmailValid = true
  return emailValidatorSpy
}

const makeSut = () => {
  // CLASS TO MOCK DATA AND TEST - AuthUseCaseSpy
  class AuthUseCaseSpy {
    async auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const emailValidatorSpy = makeEmailValidator()
  const sut = new SignUp({
    authUseCase: authUseCaseSpy,
    emailValidator: emailValidatorSpy
  })
  return {
    sut,
    authUseCaseSpy,
    emailValidatorSpy
  }
}

describe('SignUp Router', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.register(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new MissingParamError('name').message)
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Any Name'
      }
    }
    const httpResponse = await sut.register(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new MissingParamError('email').message)
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Any Name',
        email: 'email@email.com'
      }
    }
    const httpResponse = await sut.register(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new MissingParamError('password').message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.register()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })

  test('Should return 500 if no httpRequest is empty', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.register({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toEqual(new ServerError().message)
  })

  test('Should call AuthUseCaseSpy with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'Any Name',
        email: 'email@email.com',
        password: 'any_password'
      }
    }
    await sut.register(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })
})
