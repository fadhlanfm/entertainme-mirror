const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const routes = require('./routers')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', routes)

app.listen(PORT, () => console.log('listening to main server on', PORT))