'use strict';

module.exports = async ({ page, rowsPerPage, order, orderBy, filter, filterBy }, { neighborhoodRepository }) => {
    return await neighborhoodRepository.get(page, rowsPerPage, order, orderBy, filter, filterBy);
};
