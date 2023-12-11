'use strict';

module.exports = async ({ id, name, chain, products, user, date, role, userId }, { pickupRepository }) => {
    return await pickupRepository.update(id, name, chain, products, user, date, role, userId);
};
