const mariadb = require('mariadb');

/**
 * Luodaan pool jonka avulla palvelin ottaa yhteyden metropolian tietokanta palvelimeen.
 * @type {Pool}
 */
const pool = mariadb.createPool({
    host: "mysql.metropolia.fi",
    port: 3306,
    user: "ottopals",
    password: "Tieto555kanta",
    database: "ottopals",
    connectionLimit: 5

});

/**
 * Pool objekti exportataan, jotta sitä voidaan käyttää connection.js tiedostossa.
 * */
module.exports = Object.freeze({
    pool: pool
});