'use strict';

module.exports = async ({ id, status }, { neighborhoodRepository }) => {
    return await neighborhoodRepository.changeStatus(id, status);
};
