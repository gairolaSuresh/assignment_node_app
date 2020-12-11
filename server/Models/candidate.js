const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const candidateSchema = new Schema({
    name: { type: String, },
    email: {type: String },
    first_round: { type: Number, },
    second_round: {type: Number },
    third_round: { type: Number }
});

module.exports=mongoose.model('candidate',candidateSchema)