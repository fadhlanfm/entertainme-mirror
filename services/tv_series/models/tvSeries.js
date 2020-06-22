const { getDB } = require('../config/mongo')
const { ObjectId } = require('mongodb')

const db = getDB()

db.createCollection('TvSeries', {
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

const TvSeries = db.collection('TvSeries')

class tvSeriesModel {
  static showTvSeries() {
    return TvSeries.find({}).toArray()
  }

  static showOneTvSeries(id) {
    return TvSeries.findOne({ _id: ObjectId(id) })
  }

  static addTvSeries(newTvSeries) {
    return TvSeries.insertOne(newTvSeries)
  }

  static updateTvSeries(id, tvSeries) {
    return TvSeries.updateOne(
      { _id: ObjectId(id) }, {
        $set : {
          title: tvSeries.title, 
          overview: tvSeries.overview, 
          poster_path: tvSeries.poster_path, 
          popularity: tvSeries.popularity, 
          tags: tvSeries.tags
        }
      }
    )
  }

  static deleteTvSeries(id) {
    return TvSeries.deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = tvSeriesModel