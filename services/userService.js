const { User } = require('../models/userModel');
const bcrypt= require('bcryptjs');
const { config } = require('../config/userConfig');
const jwt =require('jsonwebtoken');

module.exports.register = (data) => {
    const salt= bcrypt.genSaltSync(13);
    return new Promise((resolve, reject) => {
        const hashPassword=  bcrypt.hashSync(data.password,salt);
        User.create({ name: data.name, email: data.email, password: hashPassword }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
};

module.exports.login = (data) => {
    return new Promise((resolve, reject) => {
           User.findOne({ email: data.email },(err, result) => {
            if(result){
                const isMatched=  bcrypt.compareSync(data.password,result.password);
                if(isMatched){
                    const user={
                        _id:result._id,
                        email:result.email
                    }
                    jwt.sign(user,config.secret_key,{expiresIn:"1d"},(err,token)=>{
                       if(err){
                        reject("token did not create");
                       }else{
                        resolve(token);
                       }
                    })
                }else{
                      reject('password not matched')
                }
            }else{
                reject("email not found in database");
            }
        });
    })
};

module.exports.update = (data) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: data.email }, (err, result) => {
            if (err) {
                reject('email not found in Database ',err);
            }
            else {
                if (result) {
                   User.updateOne({ _id: result._id }, { $set: { name: data.name } },(err, resultOne) => {
                        if (err) {
                            reject("data did'nt update",err);
                        }
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