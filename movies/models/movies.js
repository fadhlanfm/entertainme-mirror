const { getDB } = require('../config/mongo')
const { ObjectId } = require('mongodb')

const db = getDB()

db.createCollection('movies', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title','overview','poster_path','popularity','tags'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'title must be string and is required'
        },
        overview: {
          bsonType: 'string',
          description: 'overview must be string and is required'
        },
        poster_path: {
          bsonType: 'string',
          description: 'poster_path must be string and is required'
        },
        popularity: {
          bsonType: ['double','int'],
          description: 'popularity must be double/integer and is required'
        },
        tags: {
          bsonType: ['array','string'],
          description: 'tags must be an array of string and is required'
        }
      }
    }
  }
})

const movies = db.collection('movies')

class moviesModel {
  static showMovies() {
    return movies.find({}).toArray()
  }

  static showOneMovie(movieId) {
    return movies.findOne({ _id: ObjectId(movieId) })
  }

  static addMovie(newMovie) {
    return movies.insertOne(newMovie)
  }

  static updateMovie(id, movie) {
    return movies.updateOne(
      { _id: ObjectId(id) }, {
        $set : {
          title: movie.title, 
          overview: movie.overview, 
          poster_path: movie.poster_path, 
          popularity: movie.popularity, 
          tags: movie.tags
        }
      }
    )
  }

  static deleteMovie(id) {
      return movies.deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = moviesModel