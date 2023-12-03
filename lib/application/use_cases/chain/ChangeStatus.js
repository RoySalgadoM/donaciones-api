'use strict';

module.exports = async ({ id, status }, { chainRepository }) => {
    return await chainRepository.changeStatus(id, status);
};
