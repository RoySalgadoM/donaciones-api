'use strict';

module.exports = async ({ id }, { neighborhoodRepository }) => {
    return await neighborhoodRepository.getById(id);
};
