module.exports = class ServerError extends Error {
  constructor () {
    super('Server Error')
    this.name = 'ServerError'
  }
}
