// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
    host: "mysql.metropolia.fi",
    port: 3306,
    user: "ottopals",
    password: "Tieto555kanta",
    database: "ottopals",
    connectionLimit: 5

});
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool
});