'use strict';

module.exports = async ({ id, status }, { productRepository }) => {
    return await productRepository.changeStatus(id, status);
};
