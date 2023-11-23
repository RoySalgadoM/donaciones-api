'use strict';

module.exports = async ({ id, status }, { userRepository }) => {
    return await userRepository.changeStatus(id, status);
};
