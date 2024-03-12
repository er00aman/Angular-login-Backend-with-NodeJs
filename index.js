const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
app.use(cors())

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:false}))

const db = require('./server/db/config')
const routes = require('./server/api/router/apiRoutes')
app.use('/api',routes)


app.listen(port,()=>{
    console.log('Server is running as 5000')
})