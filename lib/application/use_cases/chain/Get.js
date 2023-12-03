'use strict';

module.exports = async ({ page, rowsPerPage, order, orderBy, filter, filterBy }, { chainRepository }) => {
    return await chainRepository.get(page, rowsPerPage, order, orderBy, filter, filterBy);
};
