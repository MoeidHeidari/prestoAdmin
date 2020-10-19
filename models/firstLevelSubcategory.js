const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const firstLevelSubCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    visibility: {
        type: Boolean,
        require: true,
        default:true

    },
    dateAdded: {
        type: Date,
        require: true
    },
    parent:
        {
            type: String,
            require: true
        }



});

const FirstLevelSubCategory = mongoose.model('FirstLevelCategories', firstLevelSubCategorySchema);

module.exports.FirstLevelSubCategory=FirstLevelSubCategory;