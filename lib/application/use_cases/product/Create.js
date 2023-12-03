'use strict';

module.exports = async ({name}, { productRepository }) => {
    return await productRepository.create(name);
};

