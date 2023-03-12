const mongoose = require('mongoose');
const Schema = mongoose.Schema

const undertakeSchema = new Schema({
    heading: {
        type: String,
        required: false,
    },
    title: {
        type: [String],
        required: false,
    },
    description: {
        type: [String],
        required: false,
    }
})

undertakeSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('Undertake', undertakeSchema)