'use strict';

module.exports = async ({id, generalAnnexes, status, role, userId}, { deliveryRepository }) => {
    return await deliveryRepository.cancel(id, generalAnnexes, status, role, userId);
};