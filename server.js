const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {} = require("./connection.js")
const db = require('./connection.js')
const response = require('./response.js')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    response(200,"coba", "Biji kuda", res)
})

app.get('/mahasiswa', (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (err, fields) => {
        if(err) throw err
        response(200, fields, res)
    })
})

app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err,fields) => {
        if(err) throw err
        response(200, fields, res)
    })
})

app.post('/mahasiswa', (req, res) => {
    const { nim , nama , prodi} = req.body
    const sql = `INSERT INTO mahasiswa VALUES (${nim}, '${nama}', '${prodi}')`
    db.query(sql, (err,fields) =>{
        if(err) response(500, "Server error" ,res)
            if(fields?.affectedRows){
                const data = {
                    isSuccess: fields.affectedRows,
                    id: fields.insertId
                }
                response(200, data, res)
            } else {
                response(404, "Error", res)
            }
        })
    })
    
app.put('/mahasiswa', (req, res) => {
    const { nim, prodi, nama } = req.body
    const sql = `UPDATE mahasiswa SET nama = '${nama}', prodi = '${prodi}' WHERE nim = ${nim}`
        
    db.query (sql, (err, fields) => {
        if(err) response(500, "Server error" ,res)
        if(fields?.affectedRows){
            const data = {
                isSuccess: fields.affectedRows,
                massage: fields.massage,
            }
            response(200, data , res)
        }
    })
})

app.delete('/mahasiswa', (req, res) => {
    const { nim } = req.body
    const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`

    db.query(sql, (err, fields) => {
        if(err) response(500, "Server error" ,res)
        if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows,
            }   
            response(200, data, res)
        }
    })
})

app.listen(port, () =>{
    console.log(`App listening on port ${port}`);
    
})
 