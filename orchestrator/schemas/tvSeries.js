const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3002/tvseries";

const typeDefs = gql`
  type TvSeries {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input InputTvSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    getAllTvSeries: [TvSeries]
    getTvSeriesById(id: String!): TvSeries
  }

  extend type Mutation {
    addTvSeries(tvSeries: InputTvSeries): TvSeries
    updateTvSeries(id: String, updates: InputTvSeries): TvSeries
    deleteTvSeries(id: String): TvSeries
  }
`;

const resolvers = {
  Query: {
    getAllTvSeries: async () => {
      try {
        let tvSeriesCache = await redis.get("tvSeriesCache");
        if (tvSeriesCache) {
          console.log("dari cache");
          return JSON.parse(tvSeriesCache);
        } else {
          console.log("dari mongodb");
          const tvSeries = await axios.get(url);
          await redis.set("tvSeriesCache", JSON.stringify(tvSeries.data));
          return tvSeries.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getTvSeriesById: async (_, args) => {
      // the params are: (parents, args, context, info)
      try {
        const { id } = args;
        const tvSeries = await axios.get(`${url}/${id}`);
        return tvSeries.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addTvSeries: async (_, args) => {
      try {
        const { tvSeries } = args;
        const newTvSeries = await axios.post(url, tvSeries);
        await redis.del("tvSeriesCache");
        return newTvSeries.data.ops[0];
      } catch (error) {
        console.log(error);
      }
    },

    updateTvSeries: async (_, args) => {
      try {
        const { updates, id } = args;
        const tvSeries = await axios.put(`${url}/${id}`, updates);
        await redis.del("tvSeriesCache");
        return JSON.parse(tvSeries.config.data);
      } catch (error) {
        console.log(error);
      }
    },

    deleteTvSeries: async (_, args) => {
      try {
        const { id } = args;
        const tvSeries = await axios.delete(`${url}/${id}`);
        await redis.del("tvSeriesCache");
        return tvSeries.data;
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
