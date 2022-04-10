const express = require('express');

const app = express();

//template engine
app.set("view engine", "ejs");
//middlewares
app.use(express.static("public"));



//routes
app.get('/', (req, res) => {
    res.render('index', {
        page_name: "index"
    });

});

app.get('/about', (req, res) => {
    res.render('about', {
        page_name: 'about',
    });
});





const port = 3000;
app.listen(port, () => {
    console.log(` Sunucu ${port} başlatıldı`);
})