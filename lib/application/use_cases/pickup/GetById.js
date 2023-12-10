'use strict';

module.exports = async ({ id, role, userId }, { pickupRepository }) => {
    return await pickupRepository.getById(id, role, userId);
};
