import gql from "graphql-tag";

export const GET_TVSERIES = gql`
  {
    getAllTvSeries {
      _id
      poster_path
    }
  }
`;

export const GET_TV = gql`
  query getTvSeriesById($_id: String!) {
    getTvSeriesById(id: $_id) {
      _id
      poster_path
      overview
      popularity
      title
      tags
    }
  }
`;

export const ADD_TV = gql`
  mutation addTvSeries(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addTvSeries(
      tvSeries: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }
    ) {
      _id
      poster_path
    }
  }
`;

export const DELETE_TV = gql`
  mutation deleteTvSeries($id: String) {
    deleteTvSeries(id: $id) {
      _id
    }
  }
`;

export const UPDATE_TV = gql`
  mutation updateTvSeries($_id: String, $updates: InputTvSeries) {
    updateTvSeries(id: $_id, updates: $updates) {
      _id
    }
  }
`;
