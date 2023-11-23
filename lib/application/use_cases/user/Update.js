'use strict';

module.exports = async ({ id, name, lastname, secondSurname, role, phone }, { userRepository }) => {
    return await userRepository.update(id, name, lastname, secondSurname, role, phone);
};
