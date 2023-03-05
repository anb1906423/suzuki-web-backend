const mongoose = require('mongoose');
const Schema = mongoose.Schema

const contactSchema = new Schema({
    address: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    linkToFace: {
        type: String,
        required: false,
    },
    zalo: {
        type: String,
        required: false,
    },
    linkToMessenger: {
        type: String,
        required: false,
    },
    tiktok: {
        type: String,
        required: false,
    },
    youtube: {
        type: String,
        required: false,
    },
    instagram: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
})

contactSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('Contact', contactSchema)