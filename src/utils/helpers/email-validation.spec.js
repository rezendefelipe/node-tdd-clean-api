jest.mock('validator', () => ({
  isEmailValid: true,
  email: '',
  isEmail (email) {
    this.email = email
    return this.isEmailValid
  }
}))

const EmailValidator = require('./email-validator')
const validator = require('validator')
const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if validator returns true', async () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@email.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns false', async () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@email.com')
    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', async () => {
    const sut = makeSut()
    sut.isValid('any_email@email.com')
    expect(validator.email).toEqual('any_email@email.com')
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    expect(sut.isValid).toThrow(new MissingParamError('email'))
  })
})
