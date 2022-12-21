const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkSchema = new Schema({
    cg: {
        type: mongoose.Types.ObjectId,
        ref: 'cg'
    },
    coordie: {
        type: mongoose.Types.ObjectId,
        ref: 'coordie'
    },
    description: {
        type: String,
        required: true
    }
})

const Work = mongoose.model('work', WorkSchema);
Work.createIndexes();
module.exports = Work;