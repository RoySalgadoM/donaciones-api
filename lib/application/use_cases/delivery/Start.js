'use strict';

module.exports = async ({ id, status, role, userId }, { deliveryRepository }) => {
    return await deliveryRepository.start(id, status, role, userId);
};
