const mongoose = require('mongoose');
const validator = require('validator');

const sevadalSchema = mongoose.Schema(
  {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
      gardian_name: {
        type: String,
        required: true,
        trim: true,
      },
      dob: {
        type: Date,
        //required:true
      },
      qualification: {
        type: String,
        required: true,
        trim: true,
      },
      business: {
        type: String,
        required: true,
        trim: true,
      },
      adress: {
        type: String,
        required: true,
        trim: true,
      },
      contact_no: {
        type: Number,
        required: true,
       // unique: true,
        trim: true,
      },
      mobile_no: {
        type: Number,
        required: true,
       // unique: true,
        trim: true,
      },
      admintion_date: {
        type: Date,
        required:true
      },
      gyan_date: {
        type: Date,
        required:true,
        trim: true,
      },
      batch_balt_no: {
        type: String,
        required: true,
        trim: true,
      },
      sevadal_type: {
        type: String,
        required: true,
        trim: true,
      },
      isDeleted: {
        type: Boolean,
        required: true,
        default: false,
      },
      isActive: {
        type: Boolean,
        required: true,
        default: false,
      },
  },
  {
    timestamps: true,
  }
);

sevadalSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const sevadal = await this.findOne({  email:email });
  return !! sevadal;
};


sevadalSchema.statics.mobileTaken = async function (mobile_no, excludeUserId) {
  const sevadal = await this.findOne({  mobile_no:mobile_no });
  return !! sevadal;
};

/**
 * @typedef Sevadal
 */
const Sevadal = mongoose.model('sevadals', sevadalSchema);

module.exports = Sevadal;
