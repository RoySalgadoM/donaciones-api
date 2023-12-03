'use strict';

module.exports = async ({ id }, { userRepository }) => {
    return await userRepository.getById(id);
};
