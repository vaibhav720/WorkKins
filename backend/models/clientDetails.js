const mongoose = require('mongoose');
const validator = require('validator');


const ClientDetailSchema = mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Please enter Email ID'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid Email'],
    },

    parentsName: {
        type: String,
        required: [true, 'Please enter Mobile No.'],
    },

    parentsContact: {
        type: String,
        required: [true, 'Please enter gender'],
    },

    parentCity:{
        type: String,
        required: [true, 'Please enter gender'],
    },

    wifeName:{
        type: String,
    },

    wifeNumber:{
        type:String,
    },

    kidsName:{
        type:String,
    },

    familyDisease:{
        type:String,
    },

    phobias: {
        type: String,
    },

    allergy:{
        type: String,
    },

    dreamWork: {
        type: String,
        required: [true, 'Please enter address'],
    },

    currentProblem: {
        type: String,
        required: [true, 'Please enter address'],
    },

});

module.exports = mongoose.model('ClientDetail', ClientDetailSchema);