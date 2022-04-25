
const db = require('./db')
const bodyParser = require("body-parser");
const port = 3000;

const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/sending', async (req, res) => {
    try {
        const result = await db.pool.query("select * from testi");
        res.send(result);
        console.log(result);
    } catch (err) {
        throw err;
    }
});




