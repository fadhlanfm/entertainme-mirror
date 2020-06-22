const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'entertainMe'

let db
const client = new MongoClient(url, { useUnifiedTopology: true })

function connect(callback) {
  client.connect(function (error) {
    if (error) {
      console.log('db connection error')
    } else {
      console.log('db connected')
      db = client.db(dbName)
    }
    callback(error)
  }) 
}

function getDB() {
  return db
}

module.exports = {
  connect,
  getDB
}