'use strict';

module.exports = async ({ id, status, role, userId }, { pickupRepository }) => {
    return await pickupRepository.changeStatus(id, status, role, userId);
};
