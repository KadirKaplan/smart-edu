const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();
//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("DB CONNECTED!")
});



//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



//routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
    console.log(` Sunucu ${port} başlatıldı`);
})