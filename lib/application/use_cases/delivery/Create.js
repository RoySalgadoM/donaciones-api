'use strict';

module.exports = async ({name, routes, user, date, role, userId}, { deliveryRepository }) => {
    return await deliveryRepository.create(name, routes, user, date, role, userId);
};

