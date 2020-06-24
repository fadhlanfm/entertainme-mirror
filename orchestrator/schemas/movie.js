const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3001/movies";

// 1. mendefinisikan "queryable fields" untuk setiap movie di data kita
// 2. ngelist query yang bisa di-execute oleh client
// 3. membuat resolver
const typeDefs = gql`
  type Movies {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input InputMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    getAllMovies: [Movies]
    getMovieById(id: String!): Movies
  }

  extend type Mutation {
    addMovie(movie: InputMovie): Movies
    updateMovie(id: String, updates: InputMovie): Movies
    deleteMovie(id: String): Movies
  }
`;

const resolvers = {
  Query: {
    getAllMovies: async () => {
      try {
        let moviesCache = await redis.get("moviesCache");
        if (moviesCache) {
          console.log("dari cache");
          return JSON.parse(moviesCache);
        } else {
          console.log("dari mongodb");
          const movies = await axios.get(url);
          await redis.set("moviesCache", JSON.stringify(movies.data));
          return movies.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getMovieById: async (_, args) => {
      try {
        const { id } = args;
        const movie = await axios.get(`${url}/${id}`);
        return movie.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addMovie: async (_, args) => {
      try {
        // const { movie } = args;
        // console.log(movie);
        const newMovie = await axios.post(url, args.movie);
        // console.log(newMovie.data);
        await redis.del("moviesCache");
        return newMovie.data.ops[0];
      } catch (error) {
        console.log(error);
      }
    },

    updateMovie: async (_, args) => {
      try {
        const { updates, id } = args;
        const movie = await axios.put(`${url}/${id}`, updates);
        await redis.del("moviesCache");
        // console.log(movie.config.data);
        return JSON.parse(movie.config.data);
      } catch (error) {
        console.log(error);
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const { id } = args;
        const movie = await axios.delete(`${url}/${id}`);
        await redis.del("moviesCache");
        return movie.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
