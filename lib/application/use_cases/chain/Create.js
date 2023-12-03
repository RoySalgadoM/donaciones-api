'use strict';

module.exports = async ({name, address, nameLinkPerson, phones}, { chainRepository }) => {
    return await chainRepository.create(name, address, nameLinkPerson, phones);
};

