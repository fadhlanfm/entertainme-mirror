const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

class entertainMeController {
  static async getAllMoviesAndTvSeries(req, res) {
    try {
      let entertainmeCache = await redis.get("entertainmeCache");
      if (entertainmeCache) {
        console.log("dari cache");
        res.status(200).json(JSON.parse(entertainmeCache));
      } else {
        console.log("dari mongodb");
        let movies = await axios.get("http://localhost:3001/movies");
        let tvseries = await axios.get("http://localhost:3002/tvseries");
        await redis.set(
          "entertainmeCache",
          JSON.stringify({ movies: movies.data, tvSeries: tvseries.data })
        );
        res.status(200).json({
          movies: movies.data,
          tvSeries: tvseries.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = entertainMeController;
