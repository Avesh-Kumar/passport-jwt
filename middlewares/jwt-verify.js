const { config } = require("../config/userConfig");
const jwt = require('jsonwebtoken');
const {User} =require('../models/userModel');

const cheackUserAuth = (req,res,next)=>{
    let token;
    const {authorization}=req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        try{
       token=authorization.split(' ')[1];
       jwt.verify(token,config.secret_key,async(err,decode)=>{
        if(err){
            res.json({"status":"failed","message":"you are not authorization person"})
        }else{
           req.user=await User.findById(decode._id).select('-password');
           next();
        }
       })
        }catch(err){

        }
    }
}
module.exports={cheackUserAuth};