const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const port = process.env.port || 8000
app.use(cors())
app.use(express.json())

const db = mysql.createConnection(
    {
        user: 'root',
        //password:"root",
        host : "localhost",
        database:"deepromSystem"
    }
)

app.listen(port, () => console.log(`server is running on port ${port}`))

require('./ProjectType.js')(app, db);
require('./ProjectGroup')(app, db);

