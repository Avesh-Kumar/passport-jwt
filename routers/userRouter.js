const userController = require('../controllers/userController');
const express=require('express');
const routers=express.Router();
const passport = require('passport');

//  const {cheackUserAuth}= require('../middlewares/jwt-verify');

 require('../middlewares/passport')(passport);


//public router 
// user register
routers.post('/register',userController.addNewUser);
//user login
routers.post('/login/:token',userController.userLogin);
//user update
routers.patch('/update',userController.updateUser);
//private router
//user get all users
routers.get('/getAllUsers',passport.authenticate('jwt',{"session":false}),userController.getUsers);

   

module.exports=routers;