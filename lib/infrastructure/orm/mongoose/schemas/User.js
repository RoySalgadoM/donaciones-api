const mongoose = require('../mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  secondSurname: String,
  email: String,
  password: String,
  role: String,
  recoverCode: String,
  phone: String,
  status: Boolean,
});

module.exports = mongoose.model('User', userSchema);
