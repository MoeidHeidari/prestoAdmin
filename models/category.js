const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    numberOfSubCategories: {
        type: Number,
        require: true,
        default: 0
    },
    visibility: {
        type: Boolean,
        require: true,
        default: true

    },
    dateAdded: {
        type: Date,
        require: true
    }


});
const Category = mongoose.model('Categories', categorySchema);

module.exports.Category=Category;
