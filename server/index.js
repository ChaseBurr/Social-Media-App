// Dependencies
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config({});

const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB_SERVER_CONNECT;

const server = new ApolloServer({
     typeDefs,
     resolvers,
     context: ({ req }) => ({ req }), // lets you access the headers
});

mongoose
     .connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
     .then(() => {
          console.log("MongoDB connected");
          return server.listen({ port: PORT });
     })
     .then((res) => {
          console.log(`Server running at ${res.url}`);
     })
     .catch((err) => {
          console.log(err);
     });
