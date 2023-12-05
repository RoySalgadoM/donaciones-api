'use strict';

module.exports = async ({ page, rowsPerPage, order, orderBy, filter }, { userRepository }) => {
    return await userRepository.get(page, rowsPerPage, order, orderBy, filter);
};
