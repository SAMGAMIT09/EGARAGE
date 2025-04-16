const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
    garageName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    availableServices: { type: [String], required: true },
    mainImage: { type: String, required: true },  
    galleryImages: { type: [String] }  
}, { timestamps: true });
module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);

