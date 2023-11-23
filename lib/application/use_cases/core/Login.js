'use strict';

const Hash = require('../bcrypt/Hash');

module.exports = async ({email, password}, { userRepository }) => {

  let hashedPassword = await Hash({ message: password });

  return userRepository.getByEmailAndPassword(email, hashedPassword);
};
