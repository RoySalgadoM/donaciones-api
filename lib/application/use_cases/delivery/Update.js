'use strict';

module.exports = async ({ id, name, routes, user, date, role, userId }, { deliveryRepository }) => {
    return await deliveryRepository.update(id, name, routes, user, date, role, userId);
};
