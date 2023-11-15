const mongoose = require('mongoose')
const { body } = require('express-validator')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: Boolean,
})

const User = mongoose.model('User', userSchema)

const userValidation = [
  body('username').notEmpty().isString().exists(),
  body('password').isAlphanumeric(),
  body('email').isEmail().notEmpty().exists(),
  body('isAdmin').isBoolean(),
]

exports.User = User
exports.userValidation = userValidation
