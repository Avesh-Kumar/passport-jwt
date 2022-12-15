const { config } = require('./config/userConfig');
const express = require('express');
require('./models/connectMongo');
const userRouter = require('./routers/userRouter');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRouter);



app.get('/', (req, res) => {
    res.json({
        name: 'avesh katiyar',
        profession: 'associate software developer'
    })
})





app.listen(config.port || (3000), () => {
    console.log(`server is running on port no.: ${config.port || 3000}...... `)
})