const { config } = require('../config/userConfig');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt= require('passport-jwt').ExtractJwt;

module.exports=function(passport){
    console.log('HEY BHGJKHGGHJHJJ');
    passport.use(
        JwtStrategy(
            {
                secretOrKey:config.secret_key,
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            function(jwt_payload,cb){
                cb(null,false)
            }
        )
    )

} 