
require('dotenv').config();
const config = {
    port: process.env.PORT,
    secret_key:process.env.SECRET_KEY,
    mongo_uri: process.env.mongo_url
};
module.exports = {config};