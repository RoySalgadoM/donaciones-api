const mongoose = require('../mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    status: Boolean
});

module.exports = mongoose.model('Product', productSchema);
