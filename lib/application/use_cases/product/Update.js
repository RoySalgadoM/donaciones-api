'use strict';

module.exports = async ({id, name}, { productRepository }) => {
    return await productRepository.update(id, name);
};
