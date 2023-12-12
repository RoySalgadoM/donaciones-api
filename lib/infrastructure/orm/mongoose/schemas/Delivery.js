const mongoose = require('../mongoose');

const deliverySchema = new mongoose.Schema({
    name: String,
    routes: Array,
    user: Object,
    date: Date,
    generalAnnexes: Object,
    status: String,
});

module.exports = mongoose.model('Delivery', deliverySchema);
