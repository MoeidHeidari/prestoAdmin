const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const attributesSchema = new mongoose.Schema({
    title:
        {
            type: String,
            required: true
        },
    question:
        {
            type:String,
            required:false
        }


});