const mongoose = require('../mongoose');

const neighborhoodSchema = new mongoose.Schema({
    name: String,
    reference: String,
    nameLinkPerson: String,
    phones: Array,
    status: Boolean
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);
