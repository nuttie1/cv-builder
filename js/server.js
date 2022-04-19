const http = require('http');
const path = require("path");
const db = require('./db')
const bodyParser = require("body-parser");


const express = require("express");
const app = express();
const palvelin = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/tasks', async (req, res) => {
    try {
        const result = await db.pool.query("select * from testi");
        res.send(result);
        console.log(result);
    } catch (err) {
        throw err;
    }
});


app.listen(8080, () => console.log(`Listening on port ${8080}`));
