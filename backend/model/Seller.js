const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    businessName: { type: String, required: true },
    businessAddress: { type: String, required: true },
    businessType: { type: String, required: true },
});

module.exports = mongoose.model('Seller', SellerSchema);
