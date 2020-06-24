const { getDb } = require("../config/mongo");
const { ObjectID } = require("mongodb");

const db = getDb();

db.createCollection("TvSeries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "overview", "poster_path", "popularity", "tags"],
      properties: {
        title: {
          bsonType: "string",
          description: "title must be a string",
        },
        overview: {
          bsonType: "string",
          description: "overview must be a string",
        },
        poster_path: {
          bsonType: "string",
          description: "poster_path must be a string",
        },
        popularity: {
          bsonType: ["double"],
          description: "popularity must be a double",
        },
        tags: {
          bsonType: ["array", "string"],
          description: "tags must be an array of string",
        },
      },
    },
  },
});

const TvSeries = db.collection("TvSeries");

class tvSeriesModel {
  static getAllTvSeries() {
    return TvSeries.find({}).toArray();
  }

  static getTvSeriesById(id) {
    return TvSeries.findOne({ _id: ObjectID(id) });
  }

  static addTvSeries(newTvSeries) {
    return TvSeries.insertOne(newTvSeries);
  }

  static updateTvSeries(id, updates) {
    return TvSeries.updateOne(
      { _id: ObjectID(id) },
      {
        $set: {
          title: updates.title,
          overview: updates.overview,
          poster_path: updates.poster_path,
          popularity: updates.popularity,
          tags: updates.tags,
        },
      }
    );
  }

  static deleteTvSeries(id) {
    return TvSeries.deleteOne({ _id: ObjectID(id) });
  }
}

module.exports = tvSeriesModel;
