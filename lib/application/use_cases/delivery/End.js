'use strict';

module.exports = async ({id, routes, dateEnd, role, userId}, { deliveryRepository }) => {
    return await deliveryRepository.end(id, routes, dateEnd, role, userId);
};