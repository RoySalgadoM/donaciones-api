'use strict';

module.exports = async ({name, reference, nameLinkPerson, phones}, { neighborhoodRepository }) => {
    return await neighborhoodRepository.create(name, reference, nameLinkPerson, phones);
};

