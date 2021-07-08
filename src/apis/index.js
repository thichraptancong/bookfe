const auth = require('./auth');
const users = require('./users');
const book = require('./book');
const categories = require('./categories');

module.exports = { authApi: auth, usersApi: users, bookApi: book, categoriesApi: categories };