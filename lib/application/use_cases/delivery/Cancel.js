'use strict';

module.exports = async ({id, annexes, role, userId}, { deliveryRepository }) => {
    return await deliveryRepository.cancel(id, annexes, role, userId);
};