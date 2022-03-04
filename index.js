const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const postroute = require('./routes/user');//importing user.js file from routes folder
const app = express();
app.use(bodyparser.json());
app.use('/user', postroute);//calling users.js file
// app.use('/user', postroute);
mongoose.connect('mongodb://127.0.0.1:27017/to-do', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected');
    }
});
app.listen(3000);