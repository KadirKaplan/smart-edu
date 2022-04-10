const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('INDEX PAGE');

})
const port = 3000;

app.listen(port, () => {
    console.log(` Sunucu ${port} başlatıldı`);
})