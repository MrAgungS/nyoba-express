const dotenv = require('dotenv')
const mysql = require('mysql')

dotenv.config()

const db = mysql.createConnection({
    host: "127.0.0.1",
    user:"root",
    password: process.env.MYSQL_PASSWORD,
    database: "coba-express",
})

module.exports = db