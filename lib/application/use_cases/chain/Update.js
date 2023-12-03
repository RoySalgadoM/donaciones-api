'use strict';

module.exports = async ({id, name, address, nameLinkPerson, phones}, { chainRepository }) => {
    return await chainRepository.update(id, name, address, nameLinkPerson, phones);
};
