const { config } = require('../config/userConfig');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt= require('passport-jwt').ExtractJwt;
const {User}= require('../models/userModel')

module.exports=function(passport){
    passport.use(
        new JwtStrategy(
            {
                secretOrKey:config.secret_key,
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
            },
              function(jwt_payload,cb){
                 User.findOne({email:jwt_payload.email},(err,user)=>{
                    if(err) {
                        return cb(err,false);
                    }
                    else if(user)
                    {
                        cb(null,user);
                    }
                    else{
                        cb(null,false)
                    }
                });
            }
        )
    )

} 