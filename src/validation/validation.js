const mongoose = require("mongoose")



function isValidObjectId(value) {
    return mongoose.Types.ObjectId.isValid(value)
}

function isValidString(value) {
    if (value === "undefined" || value === null || value === "") return false
    if (typeof value !== "string" || value.trim().length == 0) return false
    return true
}

function isValidNumber(value) {
    return isNaN(value)
}


function isValidName(value) {
    return /^[A-Za-z. ]+$/.test(value)
}


function isValidMobileNo(value) {
    return /^[0]?[6789]\d{9}$/.test(value)
}


function isValidEmailId(value) {
    return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)
}


function isValidDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value)
}


function isValidCardNumber(value) {
    return /^[C]+[0-9]{3}$/.test(value)
}


function isValidCustomerId(value) {
    return /^[A-Z]{4}$/.test(value)
}



module.exports = { isValidObjectId, isValidString, isValidNumber, isValidName, isValidMobileNo, isValidEmailId, isValidDate, isValidCardNumber, isValidCustomerId }
