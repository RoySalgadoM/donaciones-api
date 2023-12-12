const mongoose = require('../mongoose');

const deliverySchema = new mongoose.Schema({
    name: String,
    routes: Array,
    user: Object,
    date: Date,
    generalAnnexes: Object,
    status: String,
    dateEnd: Date,
});

module.exports = mongoose.model('Delivery', deliverySchema);
