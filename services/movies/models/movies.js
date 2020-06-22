const { getDb } = require('../config/mongo')
const { ObjectId } = require('mongodb')

const db = getDb()

db.createCollection('Movies', {
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

const Movies = db.collection('Movies')

class moviesModel {
  static showMovies() {
    return Movies.find({}).toArray()
  }

  static showOneMovie(id) {
    return Movies.findOne({ _id: ObjectId(id) })
  }

  static addMovie(newMovie) {
    return Movies.insertOne(newMovie)
  }

  static updateMovie(id, movie) {
    return Movies.updateOne(
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
    return Movies.deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = moviesModel