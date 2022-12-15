const userController = require('../controllers/userController');
const express=require('express');
const routers=express.Router();


// user register
routers.post('/register',userController.addNewUser);
//user login
routers.post('/login/:token',userController.userLogin);
//user update
routers.patch('/update',userController.updateUser);
//user get all users
routers.get('/getAllUsers',userController.getUsers);










module.exports=routers;