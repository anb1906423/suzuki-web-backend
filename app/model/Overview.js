const mongoose = require('mongoose');
const Schema = mongoose.Schema

const overviewSchema = new Schema({
    heading: {
        type: String,
        required: false,
    },
    yearOfOperation: {
        type: String,
        required: false,
    },
    staff: {
        type: String,
        required: false,
    },
    carsSold: {
        type: String,
        required: false,
    },
    customerSatisfied: {
        type: String,
        required: false,
    },
})

overviewSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('Overview', overviewSchema)