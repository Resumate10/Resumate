const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  location: String,
  bio: String,
  profilePicture: String
});

const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = StudentModel;
