const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const movieSchema = require("./schemas/movie");
const tvSeriesSchema = require("./schemas/tvSeries");

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, tvSeriesSchema.typeDefs],
  resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log("apollo-server ready at", url);
});
