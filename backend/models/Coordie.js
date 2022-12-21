const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoordieSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department'
    },
    ldap:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    venue:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'venue'
    },
    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'portfolio'
    }
})

const Coordie = mongoose.model('coordie', CoordieSchema);
Coordie.createIndexes();
module.exports = Coordie;