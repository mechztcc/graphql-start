const { ApolloServer, gql } = require("@apollo/server");
const { buildSchema } = require("graphql");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { faker } = require("@faker-js/faker");

const users = [];
const profiles = [];

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
        profile: String!
    }

    type Profile {
      id: ID!
      name: String!
    }

    type Query {
        userByName(name: String!): User!
        users: [User!]!
        userById(id: ID!): User!
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
    profile(parent) {
      const profile = profiles.find((el) => el.id == parent.profile);
      return profile.name;
    },
  },

  Query: {
    userByName(_, args) {
      const { name } = args;
      return users.find((el) => el.name === name);
    },

    users() {
      return users;
    },

    userById(_, args) {
      const { id } = args;
      const user = users.find((el) => {
        return el.id == String(id);
      });
      return user;
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
      profile: 2,
    });
  }

  profiles[0] = {
    id: 1,
    name: "Teacher",
  };

  profiles[1] = {
    id: 2,
    name: "Student",
  };
  console.log(`🚀 Server ready at ${url}`);
});
