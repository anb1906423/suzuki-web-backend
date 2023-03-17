const mongoose = require('mongoose');
const Schema = mongoose.Schema

const colorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

colorSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('Color', colorSchema)