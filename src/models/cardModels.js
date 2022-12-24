
const mongoose = require("mongoose")  

const cardSchema = new mongoose.Schema({

    cardNumber: { type: String, required: true, unique: true, trim: true },
    cardType: { type: String, required: true, enum: ["REGULAR", "SPECIAL"], trim: true },
    customerName: { type: String, required: true, trim: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE", trim: true },
    vision: { type: String, required: true, trim: true },
    customerID: { type: String, required: true, unique: true, trim: true },

}, { timestamps: true })


module.exports = mongoose.model("Card", cardSchema)