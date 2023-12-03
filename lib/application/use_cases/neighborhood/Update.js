'use strict';

module.exports = async ({id, name, reference, nameLinkPerson, phones}, { neighborhoodRepository }) => {
    return await neighborhoodRepository.update(id, name, reference, nameLinkPerson, phones);
};
