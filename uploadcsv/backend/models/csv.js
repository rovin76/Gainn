const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: String,
  Phone: String,
  Gender: String,
  Department: String,
  Years_Of_Experience: Number,
  Salary: Number,
});

CsvModel = mongoose.model("csvRecords", csvSchema);

module.exports = { CsvModel }