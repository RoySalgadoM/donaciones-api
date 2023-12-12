'use strict';

module.exports = async ({ page, rowsPerPage, order, orderBy, filter, filterBy, role, userId }, { deliveryRepository }) => {
    return await deliveryRepository.get(page, rowsPerPage, order, orderBy, filter, filterBy, role, userId);
};
