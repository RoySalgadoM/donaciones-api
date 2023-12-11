'use strict';

module.exports = async ({id, generalAnnexes, status, role, userId}, { pickupRepository }) => {
    return await pickupRepository.cancel(id, generalAnnexes, status, role, userId);
};