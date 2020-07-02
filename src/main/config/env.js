module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  tokenSecret: process.env.TOKEN_SECRET || 'secret'
}
