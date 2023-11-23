const mongoose = require('../mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  secondSurname: String,
  email: String,
  password: String,
  role: mongoose.ObjectId,
  recoverCode: String,
});

module.exports = mongoose.model('User', userSchema);
