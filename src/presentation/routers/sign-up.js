const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../utils/errors/index')

module.exports = class SignUp {
  constructor ({ authUseCase, emailValidator } = {}) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async register (httpRequest) {
    try {
      const { name, email, password } = httpRequest.body
      if (!name) return HttpResponse.badRequest(new MissingParamError('name'))
      if (!email) return HttpResponse.badRequest(new MissingParamError('email'))
      if (!this.emailValidator.isValid(email)) return HttpResponse.badRequest(new InvalidParamError('email'))
      if (!password) return HttpResponse.badRequest(new MissingParamError('password'))
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }
      return HttpResponse.authorized({ accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
