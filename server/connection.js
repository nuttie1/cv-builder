const db = require('./db')
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
let urlencodedParser = bodyParser.urlencoded({extended: true});

'use strict';

// Annetaan expressille cors mekanismi
app.use(cors());

/**
 * Tarjotaan expressillä staattiset tiedostot (index.html, style.css), jotka ovat kaikki 'public'-kansiossa.
 * */
app.use(express.static(process.cwd() + '/cv-builder/public'));
app.set('views', './views');
app.set('view engine', 'ejs');

/**
 * Annetaan index.html tiedosto /index kutsun kutsujalle.
 * */
app.get('/index', (req, res) => {
    res.sendFile(process.cwd() + '/cv-builder/public/views/index.html')
})

/**
 * Vastaanotetaan ja käsitellään javascript.js tiedostosta tulevia post -kutsuja.
 * Kutsuissa tulevat parametrit tallennetaan tietokantaan. Käyttäen db.js:stä tuotua poolia.
 *
 * Kutsussa annetut tiedot: Nimi(message), sposti, puhelin numero, kaupunki, työkokemus ja johdanto.
 *
 * App palauttaa 200 koodin postin lähettäjälle.
 * */
app.post('/api/:message/:email/:phone/:city/:items/:introduction', urlencodedParser, async (req, res) => {
    res.status(200);
    let name = req.params.message;
    let email = req.params.email;
    let phone = req.params.phone.replace(/\s/g, '');
    let city = req.params.city;
    let items = req.params.items;
    let introduction = req.params.introduction;

    console.log("Tallennetaan tietoja...");

    try {

        const result = await db.pool.query("INSERT INTO cv_table (name, email, phone, residence, introduction, items) VALUES ('" + name + "', '" + email + "', '" + phone + "', '" + city + "', '" + introduction + "', '" + items + "');");
        res.send(result);

    } catch (err) {
        console.log("Tallennuksessa tuli virhe: " + err);
    }
    res.end();

})

/**
 * Vastaan otetaan post -pyyntö, joka tulee javascript.js tiedostosta.
 * Pyynnössä annetaan halutun tietokannan objektin id, jolla haetaan sposti, puhelin numero, nimi, johdanto, työkokemukset ja asuinpaikka.
 *
 * App palauttaa halutut tiedot res.send:illä.
 * App palauttaa 200 koodin postin lähettäjälle.
 * */
app.post('/api/getcv/:id', urlencodedParser, async (req, res) => {
    res.status(200);

    try {

        let id = req.params.id.replace(":", "");
        const results = await db.pool.query("SELECT email, phone, name, introduction, items, residence FROM cv_table WHERE id_primary=" + id + ";");
        res.send(results);
        console.log(results);

    } catch (err) {
        console.log("Haussa tuli virhe: " + err);
    }
    res.end();
})


app.listen(port, () => console.log(`Listening on port ${port}`));



