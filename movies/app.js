const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

const { connect } = require('./config/mongo')

connect((err) => {
  const movieRouter = require('./routers')
  if(!err) {
    app.use(express.json())
    app.use(express.urlencoded({ extended:true }))
    app.use('/', movieRouter)
    app.listen(PORT, () => {
      console.log('listening to server movies on port', PORT)
    })
  }
})