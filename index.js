const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: process.env.ENGINE_API_KEY && {
    apiKey: process.env.ENGINE_API_KEY
  }
});

const app = express();

server.applyMiddleware({ app });

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen({ port: process.env.PORT || 4000 }, (url) =>
  console.log(`🚀 Server ready at ${url}/${server.graphqlPath}`)
);
