var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
var User=require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next)
{
    res.render('loginPage');

});



//======================================================================================================================
router.post('/auth', async (req, res, next) => {

    console.log(req.body);
    let user = await User.User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
    if (!user.isActivated) return res.status(402).send('user is not activated yet');
    if(!user.role=='1') return res.status(401).send('Access denied');


    const token = user.generateAuthToken();

    const response={

        location:'/'
    }
    res.cookie('my-token', token, { maxAge: 900000, httpOnly: true });
    res.send(response);


});

module.exports = router;
