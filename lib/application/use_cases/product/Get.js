'use strict';

module.exports = async ({ page, rowsPerPage, order, orderBy, filter, filterBy }, { productRepository }) => {
    return await productRepository.get(page, rowsPerPage, order, orderBy, filter, filterBy);
};
