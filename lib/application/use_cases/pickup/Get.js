'use strict';

module.exports = async ({ page, rowsPerPage, order, orderBy, filter, filterBy, role, userId }, { pickupRepository }) => {
    return await pickupRepository.get(page, rowsPerPage, order, orderBy, filter, filterBy, role, userId);
};
