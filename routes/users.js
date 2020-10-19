var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const {User, validate} = require('../models/user.js');
const VisitModel = require('../models/VisitStatisctic');
const _ = require('lodash');
/* GET users listing. */
router.get('/', auth, async (req, res, next) => {
    let customers = await User.find({role: '2'}).select('-password -activeToken -activeExpires');
    let admins = await User.find({role: '1'}).select('-password -activeToken -activeExpires');
    res.render('UsersDashboard', {Users: customers, Admins: admins,page:'usersDashboard'});
});


router.get('/me', auth, async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-password -isActivated -_id -activeToken -activeExpires -phoneNumber ');
    res.send(user);
});

router.post('/getUserInfo', auth, async (req, res, next) => {
    const user = await User.findById(req.body.userId).select('-password -_id -activeToken -activeExpires ');
    console.log(user);
    res.send(user);
    //res.status(401).send('sdfsdf');

});
router.post('/removeUser', auth, async (req, res, next) => {
    await User.deleteOne({_id:req.body.userId})?res.send('user has been removed successfully'):res.status(500).send('Server internal error');
});

router.post('/activaUser',auth,async (req,res,next)=>
{
    const user = await User.updateOne({_id:req.body.userId},{isActivated:true});
    if(user)
    {
        res.send('user has been activated successfully');
    }
    else{
        res.status(500).send('internal server error');
    }

});
router.post('/deactiveUser',auth,async (req,res,next)=>
{
    const user = await User.updateOne({_id:req.body.userId},{isActivated:false});
    if(user)
    {
        res.send('user has been deactivated successfully');
    }
    else{
        res.status(500).send('internal server error');
    }

});

router.post('/updateUserInfo',auth,async (req,res,next)=>
{


    let user=await User.findById(req.body.userId);
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
    user.email=req.body.email;
    user.phoneNumber=req.body.phoneNumber;
    user.role=req.body.role;



    if(user.save())
    {
        res.send('user has been updated successfully');
    }
    else {
        res.status(400).send('invalidate information');
    }





});


router.get('/visitNumbersByDate', auth, async (req, res, next) => {


    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var year = dateObj.getUTCFullYear();

    let visits = await VisitModel.find({year: year});


    res.send(visits);

});



module.exports = router;
