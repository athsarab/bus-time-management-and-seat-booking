const mongoose = require ("mongoose");

const bookingScema = new mongoose.Schema({

    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    seats: {
        type: String,
        required: true,
    },
    package: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    SelectedSeats:{
       type: [Number] ,
       required: true,
    }
});


module.exports = Booking = mongoose.model("booking", bookingScema );

