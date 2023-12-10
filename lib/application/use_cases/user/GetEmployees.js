'use strict';

module.exports = async ({ page, rowsPerPage, order, orderBy, filter }, { userRepository }) => {
    return await userRepository.getEmployees(page, rowsPerPage, order, orderBy, filter);
};
