const { User } = require('../models/userModel');
const bcrypt= require('bcryptjs');
const { config } = require('../config/userConfig');
const jwt =require('jsonwebtoken');

module.exports.register = (data) => {
    const salt= bcrypt.genSaltSync(13);
    return new Promise( async (resolve, reject) => {
        const hashPassword= await bcrypt.hashSync(data.password,salt);
        User.create({ name: data.name, email: data.email, password: hashPassword }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if(result){
                    const user={
                        _id:result._id,
                        password:result.password
                    }
                      const token= jwt.sign(user,config.secret_key,{expiresIn:"1d"});
                      resolve(token);
                }else{
                    reject(err)
                }
            
            }
        });
    })
};

module.exports.login = (req) => {
const data=req.body;
console.log(data,'llllllllpppp');
const token=req.params;
console.log(token,'tokkkkkkken');
    return new Promise((resolve, reject) => {
        
        User.findOne({ email: data.email },async(err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if(result){
                    console.log(result,'looooooooooooooooo');
                const isMatched= await bcrypt.compare(data.password,result.password);
                console.log(isMatched,'password is matched');
                if(isMatched){
                 jwt.verify(config.secret_key,{"token":token});
                 resolve(decode);
                }else{
                    reject(err);
                }  
            }else{
                reject(err);
            }              
            }
        });
    })
};

module.exports.update = (data) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: data.email }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if (result) {
                    User.updateOne({ _id: result._id }, { $set: { name: data.name } }, (err, resultOne) => {
                        if (err) throw err;
                        else {
                            resolve(resultOne);
                        }
                    })
                }
            }
        });
    })
};

module.exports.allUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}