import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { faker } from "@faker-js/faker";
import typeDefs from "./graphql/schemas/schema.js";
import resolvers from "./graphql/resolvers/resolvers.js";
import times from "lodash.times";
import random from "lodash.random";
import db from "./models/index.js";

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
});

const app = express();
const port = 4000;

server.start().then(res => {
  server.applyMiddleware({ app, path: '/' });
  app.use(express.static("app/public"));
  app.listen({ port }, () => 
    console.log(`Gateway API running at port: ${port}`)
  );  
});
faker.seed(42)
db.sequelize.sync({force : true}).then(() => {
  // populate user table with dummy data
  db.user.bulkCreate(
    times(10, () => ({
      //id : faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    }))
  );
  // populate property table with dummy data
  db.property.bulkCreate(
    times(10, () => ({
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip : faker.location.zipCode(),
      rent : faker.number.int({ min: 300, max: 2000 }),
      userId: random(1, 10)
    }))
  );

})