import gql from "graphql-tag";

export const GET_ALL = gql`
  {
    getAllMovies {
      _id
      poster_path
    }

    getAllTvSeries {
      _id
      poster_path
    }
  }
`;
