'use strict';

module.exports = async ({id, role, userId}, { pickupRepository }) => {
    return await pickupRepository.cancel(id, role, userId);
};