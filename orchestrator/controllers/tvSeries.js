const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

class tvSeriesController {
  static async getAllTvSeries(req, res) {
    try {
      let tvSeriesCache = await redis.get("tvSeriesCache");
      if (tvSeriesCache) {
        console.log("dari cache");
        res.status(200).json(JSON.parse(tvSeriesCache));
      } else {
        console.log("dari mongodb");
        const tvSeries = await axios.get("http://localhost:3002/tvseries");
        await redis.set("tvSeriesCache", JSON.stringify(tvSeries.data));
        res.status(200).json(tvSeries.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getTvSeriesById(req, res) {
    try {
      const { id } = req.params;
      const dataTvSeries = await axios.get(
        `http://localhost:3002/tvseries/${id}`
      );
      res.status(200).json(dataTvSeries.data);
    } catch (error) {
      console.log(error);
    }
  }

  static async addTvSeries(req, res) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const dataTvSeries = await axios.post(`http://localhost:3002/tvseries`, {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      });
      await redis.del("tvSeriesCache");
      await redis.del("entertainmeCache");
      res.status(201).json(dataTvSeries.data);
    } catch (error) {
      console.log(error);
    }
  }

  static async editTvSeries(req, res) {
    try {
      const { id } = req.params;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const dataTvSeries = await axios.put(
        `http://localhost:3002/tvseries/${id}`,
        {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        }
      );
      await redis.del("tvSeriesCache");
      await redis.del("entertainmeCache");
      res.status(200).json(dataTvSeries.data);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteTvSeries(req, res) {
    try {
      const { id } = req.params;
      const dataTvSeries = await axios.delete(
        `http://localhost:3002/tvseries/${id}`
      );
      await redis.del("tvSeriesCache");
      await redis.del("entertainmeCache");
      res.status(200).json(dataTvSeries.data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = tvSeriesController;
