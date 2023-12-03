'use strict';

module.exports = async ({ id }, { productRepository }) => {
    return await productRepository.getById(id);
};
