const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { attendenceService } = require('../services');

const createAttendence = catchAsync(async (req, res) => {
  const user = await attendenceService.createAttendence(req.body);
  res.status(httpStatus.CREATED).send({httpStatus:httpStatus.CREATED,msg:'Success',data:user});
});

const listAttendence = catchAsync(async (req, res) => {
  const {page,limit,month,year} = req.body;
  const result = await attendenceService.attendenceList(month,year,page,limit);
  res.status(httpStatus.CREATED).send({httpStatus:httpStatus.CREATED,msg:'Success',result});
});

module.exports = {
  listAttendence,
  createAttendence,
};
