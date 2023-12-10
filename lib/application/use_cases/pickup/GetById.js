'use strict';

module.exports = async ({ id }, { pickupRepository }) => {
    return await pickupRepository.getById(id);
};
