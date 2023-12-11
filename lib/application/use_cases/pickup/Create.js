'use strict';

module.exports = async ({name, chain, products, user, date, role, userId}, { pickupRepository }) => {
    return await pickupRepository.create(name, chain, products, user, date, role, userId);
};

