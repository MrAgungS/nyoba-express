const dotenv = require('dotenv')
const mysql = require('mysql')

dotenv.config()

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

module.exports = db