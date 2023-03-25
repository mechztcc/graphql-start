const { ApolloServer, gql } = require("@apollo/server");
const { buildSchema } = require("graphql");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { faker } = require("@faker-js/faker");

const users = []

const typeDefs = buildSchema(`

    type User {
        id: ID!
        name: String!
        second_name: String!
        full_name: String!
        email: String!
        birth: String!
        payment: Float!
        vip: Boolean!
        createdAt: String!
        createdDate: String!
    }

    type Query {
        hello: String!
        userByName: User!
        arrayOfNumbers: [Int!]!
        users: [User!]!
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

    arrayOfNumbers() {
      return [1, 2, 3];
    },

    users() {
      return users;
    },
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server).then(({ url }) => {
  for (let index = 0; index < 10; index++) {
    users.push({
      id: faker.random.numeric(),
      name: faker.name.firstName(),
      second_name: faker.name.firstName(),
      email: faker.internet.email(),
      birth: faker.date.recent().toDateString(),
      payment: faker.commerce.price(),
      vip: false,
      createdAt: new Date().toDateString(),
    });
  }
  console.log(`🚀 Server ready at ${url}`);
});
