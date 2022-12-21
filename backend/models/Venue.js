const mongoose = require('mongoose');
const { Schema } = mongoose;

const VenueSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
})

const Venue = mongoose.model('venue', VenueSchema);
Venue.createIndexes();
module.exports = Venue;