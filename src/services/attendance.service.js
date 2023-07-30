const httpStatus = require('http-status');
const { Sevadal, Attendence } = require('../models');
const ApiError = require('../utils/ApiError');

const createAttendence = async (attendantBody) => {
  const {sevadalId,date,attendence,remark} = attendantBody;
  const ifExist = await Sevadal.findById(attendantBody.sevadalId);
  if (!ifExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no sevadal exists');
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let ifAttendence = await Attendence.findOne({day,month,year,sevadalId});
if(ifAttendence){
  ifAttendence.attendence = attendence;
  if(remark){
    ifAttendence.remark = remark;
  }
  await ifAttendence.save();
}else{
  await Attendence.create({sevadalId,date,attendence,day,month,year,remark});
}
  return ifAttendence;
};

const createBulk = async (attendantBody) => {
  const {sevadals} = attendantBody;
  await Promise.all(
    sevadals.map(async(sevadal,index)=>{

      const day = sevadal.date.getDate();
      const month = sevadal.date.getMonth() + 1;
      const year = sevadal.date.getFullYear();
    
      await Attendence.create({sevadalId:sevadal.sevadalId,date:sevadal.date,attendence:sevadal.attendence,day,month,year,remark:sevadal.remark});
    })
  );

  return true;
};

const attendenceList = async (month,year,page=1,limit=10) => {
  let attendence = [];
  numberOfDays = new Date(year, month, 0).getDate();

  const totalSevadals = await Sevadal.find({isDeleted:false}).countDocuments();
  
  const sevadals = await Sevadal.find({isDeleted:false})
  .skip((page - 1) * limit)
  .limit(limit);

  await Promise.all(
    sevadals.map(async(sevadal,index)=>{
      let attendenceObj = await monthArray(month,year,sevadal._id,numberOfDays);
      attendence.push({sevadal:sevadal.name,attendence:attendenceObj});
    })
  );

  return {
    totalRecords:totalSevadals,
    currentPage: page,
    results:attendence
  };
};

const monthArray = async (month,year,sevadalId,numberOfDays=30) => {
    let monthlyReport = [];
    
    const attendence = await Attendence.find({month,year,sevadalId});

    for (let day = 1; day <= numberOfDays; day++) {
      let dayObj = {day:day};

      const ifExists = attendence.find(obj => obj.day == day)
      if(ifExists){
        dayObj.attendence = ifExists.attendence
      }else{
        dayObj.attendence = "";
      }
      
      monthlyReport.push(dayObj);
    }

    return monthlyReport;
};

module.exports = {
  createAttendence,
  attendenceList,
  createBulk,
};