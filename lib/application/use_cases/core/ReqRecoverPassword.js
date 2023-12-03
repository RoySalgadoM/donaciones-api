'use strict';

module.exports = async ({ email }, { userRepository }) => {
    let user = await userRepository.getByEmail(email);

    if (!user) return null;

    let recoverCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    user.recoverCode = recoverCode;

    await userRepository.updateRecoverCode(email, recoverCode);

    return recoverCode;
};
