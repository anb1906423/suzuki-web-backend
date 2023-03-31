const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    },
    imageTemp: {
        type: String,
        required: true
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
    href: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    newProduct: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    moreInfo: {
        type: String,
        required: false
    },
    long: {
        type: Number,
        required: false
    },
    wide: {
        type: Number,
        required: false
    },
    high: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    fuelTankVolume: {
        type: Number,
        required: false
    },
    colorList: {
        type: [String],
        required: false
    },
    wheelbaseLength: {
        type: Number,
        required: false
    },
    engineName: {
        type: String,
        required: false
    },
    capacity: {
        type: Number,
        required: false
    },
    speedUp: {
        type: Number,
        required: false
    },
    fuelConsumption: {
        type: Number,
        required: false
    },
    maxSpeed: {
        type: Number,
        required: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    version: {
        type: [String],
    },
    outStanding: {
        type: Boolean,
    },
    state: {
        type: Boolean,
        default: true,
    },
})

productSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('Car', productSchema)