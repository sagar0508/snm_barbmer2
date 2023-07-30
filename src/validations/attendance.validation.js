const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createAttendence = {
  body: Joi.object().keys({
      sevadalId: Joi.string().custom(objectId).required(),
      date:Joi.date().required(),
      attendence:Joi.boolean().required(),
      remark:Joi.string(),
  }),
};


const listAttendence = {
  body: Joi.object().keys({
      year:Joi.string().required(),
      month:Joi.string().required()
  }),
};


const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAttendence,
  listAttendence,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
