// Dependencies
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
require("dotenv").config({});

const server = new ApolloServer({
     typeDefs,
     resolvers,
     context: ({ req }) => ({ req }), // lets you access the headers
});

mongoose
     .connect(process.env.MONGODB_SERVER_CONNECT, { useNewUrlParser: true })
     .then(() => {
          console.log("db connected");
          return server.listen({ port: 3000 });
     })
     .then((res) => {
          console.log(`Server running at ${res.url}`);
     });
