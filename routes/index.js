var express = require('express');
var router = express.Router();
var userModel=require('../models/user');
const auth=require('../middleware/auth');


/* GET home page. */
router.get('/',auth, async (req, res, next)=>
{
  userModel.getAllUserCount().then(result=>
  {
     res.render('index',{allusers:result.allUsersCount,activeUsers:result.activeUsersCount,pendingUsers:result.pendingUsersCount,premiumUsers:result.premiumUsersCount,page:'generalDashboard'});
  });

});


module.exports = router;
