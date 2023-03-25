const { ApolloServer, gql } = require("@apollo/server");
const { buildSchema } = require("graphql");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = buildSchema(`

    type User {
        id: ID!
        name: String!
        second_name: String!
        full_name: String!
        email: String!
        birth: Int!
        payment: Float!
        vip: Boolean!
        createdAt: String!
        createdDate: String!
    }

    type Query {
        hello: String!
        userByName: User!
    }
`);

const resolvers = {
  User: {
    createdDate(parent) {
      return new Date(parent.createdAt).toISOString();
    },
    full_name(parent) {
      return `${parent.name} ${parent.second_name}`;
    },
  },

  Query: {
    hello() {
      return new Date().toDateString();
    },
    userByName(parent, args, contextValue, info) {
      return {
        id: 1,
        name: "alberto",
        second_name: "paiva",
        email: "email@email.com",
        birth: "22/10/2022",
        payment: 5000.0,
        vip: true,
        createdAt: new Date().toDateString(),
      };
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
