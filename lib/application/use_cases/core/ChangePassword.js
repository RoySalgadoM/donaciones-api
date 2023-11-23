'use strict';
const Hash = require('../bcrypt/Hash');

module.exports = async ({ email, password, newPassword }, { userRepository }) => {

    let hashedNewPassword = await Hash({ message: newPassword });
    let hashedOldPassword = await Hash({ message: password });

    return await userRepository.getByEmailAndPasswordAndUpdate(email, hashedOldPassword, hashedNewPassword);
};
