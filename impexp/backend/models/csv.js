const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  "FirstName": {
    type: String,
    trim: true
  },
  "LastName": {
    type: String,
    trim: true
  },
  "Email": String,
  "Phone": String,
  "Gender": String,
  "Department": String,
  "JobTitle": String,
  "YearsOfExperience": Number,
  "Salary": Number,
});

CsvModel = mongoose.model("csvRecords", csvSchema);

module.exports = { CsvModel }