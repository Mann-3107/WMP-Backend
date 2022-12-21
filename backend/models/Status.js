const mongoose = require('mongoose');
const { Schema } = mongoose;

const StatusSchema = new Schema({
    coordie: {
        type: mongoose.Types.ObjectId,
        ref: 'coordie'
    },
    work: {
        type: mongoose.Types.ObjectId,
        ref: 'work'
    },
    comments: {
        type: String,
        required: true
    }
})

const Status = mongoose.model('status', StatusSchema);
Status.createIndexes();
module.exports = Status;