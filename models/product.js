const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ProductSchema = new mongoose.Schema({
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
    attributes:
        [
            {
                attributeId:
                    {
                        type:String,
                        required:true
                    },
                valueId:
                    {
                        type:String,
                        required:true
                    }
            }

        ]



});