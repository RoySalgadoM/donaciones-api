'use strict';

module.exports = async ({ id, status, role, userId }, { deliveryRepository }) => {
    return await deliveryRepository.changeStatus(id, status, role, userId);
};
