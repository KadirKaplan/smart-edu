const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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
global.userIN = null;
//middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })

}));

//routes
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
  });


app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
    console.log(` Sunucu ${port} başlatıldı`);
})