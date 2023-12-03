'use strict';

module.exports = async ({ id }, { chainRepository }) => {
    return await chainRepository.getById(id);
};
