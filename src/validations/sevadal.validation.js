const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().required(),
      contact_no:Joi.number(),
      gardian_name:Joi.string().required(),
      dob:Joi.date(),
      qualification:Joi.string().required(),
      business:Joi.string().required(),
      adress:Joi.string().required(),
      mobile_no:Joi.number().required(), 
      image:Joi.string(),
      admintion_date:Joi.date(),
      gyan_date:Joi.date().required(),
      batch_balt_no:Joi.string().required(),
      sevadal_type:Joi.string().required(),
      remark:Joi.string()
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
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
