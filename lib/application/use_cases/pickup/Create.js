'use strict';

module.exports = async ({name, reference, nameLinkPerson, phones}, { pickupRepository }) => {
    return await pickupRepository.create(name, reference, nameLinkPerson, phones);
};

