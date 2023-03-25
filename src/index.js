const { ApolloServer, gql } = require("@apollo/server");
const { buildSchema } = require("graphql");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = buildSchema(`

type Query {
    hello: String!
  }`);

const resolvers = {
  Query: {
    hello() {
      return new Date().toDateString();
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
