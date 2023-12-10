'use strict';

module.exports = async ({ id, status }, { pickupRepository }) => {
    return await pickupRepository.changeStatus(id, status);
};
