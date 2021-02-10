const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
})
