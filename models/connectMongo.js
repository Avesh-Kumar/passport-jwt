const { config } = require('../config/userConfig');
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
mongoose.connect(config.mongo_uri,{
    useNewUrlParser:"true",
    useUnifiedTopology:"true"
});
mongoose.connection.on("error",err=>{
  console.log("err",err);
});
mongoose.connection.on("connected",(err,res)=>{
    console.log("application connected with mogoDB atlas.........");
});