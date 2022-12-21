const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoordieSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    cg:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cg'
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
    }
})

const Coordie = mongoose.model('coordie', CoordieSchema);
Coordie.createIndexes();
module.exports = Coordie;