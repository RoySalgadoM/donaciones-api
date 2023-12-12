'use strict';

module.exports = async ({id, products, role, userId, status}, { deliveryRepository }) => {
    return await deliveryRepository.end(id, products, role, userId, status);
};