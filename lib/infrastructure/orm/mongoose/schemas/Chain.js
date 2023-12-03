const mongoose = require('../mongoose');

const chainSchema = new mongoose.Schema({
    name: String,
    address: String,
    nameLinkPerson: String,
    phones: Array,
    status: Boolean
});

module.exports = mongoose.model('Chain', chainSchema);
