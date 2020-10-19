const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const VisitorSchema = new mongoose.Schema({

    year:
        {
            type: Number,
            default: 2020,
            require: true
        },
    month:
        {
            type: Number,
            default: 1,
            require: true
        },
    visitNumber:
        {
            type: Number,
            default: 0,
            require: true
        },
    browsers:
        {
            chrome:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Firefox:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Safari:
                {
                    type: Number,
                    require: false,
                    default: 0
                },

            IE:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Edge:
                {
                    type: Number,
                    require: false,
                    default: 0
                }

        },
    platform:
        {

            Desktop:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Mobile:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Tablet:
                {
                    type: Number,
                    require: false,
                    default: 0
                }


        },
    OS:
        {
            Android:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Windows:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Linux:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Linux64:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Mac:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            ChromeOS:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Bada:
                {
                    type: Number,
                    require: false,
                    default: 0
                },
            Blackberry:
                {
                    type: Number,
                    require: false,
                    default: 0
                }


        }




});
const Visitors = mongoose.model('Visitors', VisitorSchema);
module.exports = Visitors;

