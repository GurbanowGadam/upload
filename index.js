require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fileUpload = require('express-fileupload')
const port = 3000
const host = '127.0.0.1'

//fileUpload
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir : '/tmp/'
// }))


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())
app.listen(port, ()=>{
    console.log(`http://${host}:${port} listening`)
})

require('./app_server/router/routerManager')(app)
