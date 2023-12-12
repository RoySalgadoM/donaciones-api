'use strict';

module.exports = async ({id, annexes, role, userId}, { deliveryRepository }) => {
    return await deliveryRepository.end(id, annexes, role, userId);
};