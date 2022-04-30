const db = require('./db')
const bodyParser = require("body-parser");
const express = require("express");
const path = require('path');

const cors = require('cors');
const app = express();

const port = 3000;

'use strict';

let urlencodedParser = bodyParser.urlencoded({ extended: true });

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
*/
//app.use('/static', express.static(path.join(__dirname, 'public')))

// app.use(express.static(__dirname + '/public'));
//app.use(express.static(process.cwd() + '/public'));

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');


app.get('', (req, res) => {
    res.render('index', { text: 'Hey' })
})
app.get('/index', (req, res) => {
    res.sendFile(process.cwd() + '/public/views/index.html')
})

app.post('/api/submitting',urlencodedParser, function (req, res) {

    res.send("Hello POST!");
    console.log("Täällä POST");
    res.end();
});
app.get('/api/gettest', function (req, res){
    res.send("Hello GET!");
    console.log("Täällä GET");
    res.end();
});
app.listen(port , () => console.log(`Listening on port ${port}`));

/*try {

       const result = await db.pool.query("select * from testi");
       res.send(result);
       console.log(result);
   } catch (err) {
       throw err;
   }*/
/*
app.get('cv-nuilder/personalia', (req, res) => {
    console.log("Somehting");
    res.end();
});

*/



