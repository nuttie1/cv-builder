const db = require('./db')
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const app = express();

'use strict';

const port = 3000;
let urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(cors());

/**
 * Tarjotaan staattiset tiedostot (index.html, style.css jne.) käyttäjälle käyttäen expressiä. Staattiset tiedostot on
 * laitettu public kansioon erikseen selkeyden vuoksi.
 */
app.use(express.static(process.cwd() + '/cv-builder/public'));
app.set('views', './views');
app.set('view engine', 'ejs');


app.get('', (req, res) => {
    res.render('index', {text: 'Hey'})
})

/**
 * Lähetetään index.html tiedosto
 * */
app.get('/index', (req, res) => {
    res.sendFile(process.cwd() + '/cv-builder/public/views/index.html')
})

/**
 * Vastaanottaa javascriptiltä tulevia posteja. Postit sisältävät index.html sivun tietoja kuten cv:n tekijän nimi,
 * s-posti tai puhelin numero.
 * Funktio tallentaa annetut tiedot tietokantaan.
 * */
app.post('/api/:message/:email/:phone/:city/:introduction/:items', urlencodedParser, async (req, res) => {
    res.status(200);
    let name = req.params.message;
    let email = req.params.email;
    let phone = req.params.phone.replace(/\s/g, '');
    let city = req.params.city;
    let intro = req.params.introduction;
    let items = req.params.items;

    console.log("Tallennetaan tietoja...");

    try {
        const result = await db.pool.query("INSERT INTO cv_table (name, email, phone, residence, introduction, items) VALUES ('" + name + "', '" + email + "', '" + phone + "', '" + city + "', '" + intro + "', '" + items + "');");
        res.send(result);
    } catch (err) {
        console.log("Tallennuksessa tuli virhe: " + err);
    }

    res.end();

})


app.post("/api/getcv/:name", urlencodedParser, async (req, res) => {
    try {
        const email = await db.pool.query("SELECT email FROM cv_table WHERE NAME=" + req.params.name + ";");
        const phone = await db.pool.query("SELECT phone FROM cv_table WHERE NAME=" + req.params.name + ";")
        res.send(email);
        console.log(email + " " + phone);
        await db.pool.end();

    } catch (err) {
        console.log("Tallennuksessa tuli virhe: " + err);
    }
})
app.post("/api/getnames", urlencodedParser, async (req, res) => {
    try {
        const results = await db.pool.query("SELECT name FROM cv_table;");
        res.send(results);
        console.log(results);
    } catch (err) {
        console.log("Tallennuksessa tuli virhe: " + err);
    }
})


app.listen(port, () => console.log(`Listening on port ${port}`));



