const { getDb } = require("../config/mongo");
const { ObjectID } = require("mongodb");

const db = getDb();

db.createCollection("Movies", {
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

const Movies = db.collection("Movies");

class moviesModel {
  static getAllMovies() {
    return Movies.find({}).toArray();
  }

  static getMovieById(id) {
    return Movies.findOne({ _id: ObjectID(id) });
  }

  static addMovie(newMovie) {
    return Movies.insertOne(newMovie);
  }

  static updateMovie(id, updates) {
    return Movies.updateOne(
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

  static deleteMovie(id) {
    return Movies.deleteOne({ _id: ObjectID(id) });
  }
}

module.exports = moviesModel;
