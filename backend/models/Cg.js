const mongoose = require('mongoose');
const { Schema } = mongoose;

const CgSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    department:{
        type: mongoose.Types.ObjectId,
        ref: 'department',
        required: true
    },
    ldap:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const Cg = mongoose.model('cg', CgSchema);
Cg.createIndexes();
module.exports = Cg;