'use strict';

module.exports = async ({name, chain, products, user, date, role, userId}, { deliveryRepository }) => {
    return await deliveryRepository.create(name, chain, products, user, date, role, userId);
};

