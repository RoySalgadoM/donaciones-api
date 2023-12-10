const mongoose = require('../mongoose');

const pickupSchema = new mongoose.Schema({
    name: String,
    date: Date,
    status: String,
    chain: Object,
    products: Array,
    generalAnnexes: Object,
    user: Object,
});

module.exports = mongoose.model('Pickup', pickupSchema);
