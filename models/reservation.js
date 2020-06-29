const mongoose = require('mongoose');

// You need to define the schema for a reservation
const ReservationSchema = new mongoose.Schema({
    // associated user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    // quantity of guests
    guests: {
        type: Number,
        required: true
    },
    // restaurant name
    restaurant: {
        type: String,
        enum: ['Kelseys', 'Montanas', 'Outbacks', 'Harveys', 'Swiss Chalet'],
        default: 'Kelseys' 
    },
    // date
    date: {
        type: Date,
        required: true 
    },
    //time
    time: {
        type: Number,
        required: true
    }
});
