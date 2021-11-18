const express = require('express')
// const mySqlConnection = require('../mysqlConnection')
const app = express()
require('../sequelizeMySqlDb');
const routes = require('./routes/routes')
app.set('port', process.env.PORT || 3005)
app.use(express.json())

app.use(routes)


app.listen(app.get('port'), ()=> {
    console.log("this server started on port"+app.get('port'))
})