const mongoose = require('mongoose');

const attendenceSchema = mongoose.Schema(
  {
    sevadalId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Sevadal',
      required: true,
    },
    attendence: {
      type: Boolean,
      required: true,
    },
    remark: {
      type: String,
      required: false,
      default:""
    },
    date: {
      type: Date,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Attendence
 */
const Attendence = mongoose.model('Attendence', attendenceSchema);

module.exports = Attendence;
