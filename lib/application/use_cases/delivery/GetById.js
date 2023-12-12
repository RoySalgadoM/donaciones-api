'use strict';

module.exports = async ({ id, role, userId }, { deliveryRepository }) => {
    return await deliveryRepository.getById(id, role, userId);
};
