const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  year:Number,
  section:String,
  day: String,
  period: Number,
  time: String,
  sub_code: String,
  venue: String
});

module.exports = mongoose.model(
  "Timetable",
  timetableSchema,
  "timetable"
);