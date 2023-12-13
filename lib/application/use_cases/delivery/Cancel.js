'use strict';

module.exports = async ({id, generalAnnexes, dateEnd, role, userId}, { deliveryRepository }) => {
    return await deliveryRepository.cancel(id, generalAnnexes, dateEnd, role, userId);
};