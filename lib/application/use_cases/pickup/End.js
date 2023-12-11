'use strict';

module.exports = async ({id, products, role, userId, status}, { pickupRepository }) => {
    return await pickupRepository.end(id, products, role, userId, status);
};