const mongoose = require('mongoose');
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
})

const Department = mongoose.model('department', DepartmentSchema);
Department.createIndexes();
module.exports = Department;