const mongoose = require('mongoose');
const { Schema } = mongoose;

const PortfolioSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
})

const Portfolio = mongoose.model('portfolio', PortfolioSchema);
Portfolio.createIndexes();
module.exports = Portfolio;