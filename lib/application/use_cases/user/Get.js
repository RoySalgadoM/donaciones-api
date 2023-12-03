'use strict';

module.exports = async ({ page, rowsPerPage, order, orderBy, filter, filterBy }, { userRepository }) => {
    return await userRepository.get(page, rowsPerPage, order, orderBy, filter, filterBy);
};
