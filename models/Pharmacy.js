const mongoose = require("mongoose")

const Schema = mongoose.Schema

const PharmacySchema = new Schema({
    medicineName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true

    },
    quantity: {
        type: String,
        required: true

    },
    expirationDate: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true

    }

})

const Pharmacy = mongoose.model("pharmacyInvenoty", PharmacySchema)

module.exports = Pharmacy