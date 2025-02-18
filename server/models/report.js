const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    busNo: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    reservedIncome: {
        type: Number,
        required: true,
    },
    frequencyOfTrips: {
        type: Number,
        required: true,
    },
    dailyIncome: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    amountCollected: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Report", ReportSchema);
