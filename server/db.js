const mariadb = require('mariadb');

/**
 * Luodaan yhteys allas tietokantaan.
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
 * Viedään allas muille tiedostoille käytettäviksi.
 * @type {Readonly<{pool: Pool}>}
 */
module.exports = Object.freeze({
    pool: pool
});