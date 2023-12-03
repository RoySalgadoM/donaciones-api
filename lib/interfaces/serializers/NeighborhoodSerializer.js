'use strict';

const _serializeSingleNeighborhood = (neigborhood) => {
  return {
    'id': neigborhood.id,
    'street': neigborhood.street,
    'city': neigborhood.city,
    'state': neigborhood.state,
    'cp': neigborhood.cp,
    'reference': neigborhood.reference,
    'nameLinkPerson': neigborhood.nameLinkPerson,
    'phoneLinkPerson': neigborhood.phoneLinkPerson,
    'status': neigborhood.status
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleNeighborhood);
    }
    return _serializeSingleNeighborhood(data);
  }

};