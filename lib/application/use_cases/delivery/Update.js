'use strict';

module.exports = async ({ id, name, chain, products, user, date, role, userId }, { deliveryRepository }) => {
    return await deliveryRepository.update(id, name, chain, products, user, date, role, userId);
};
