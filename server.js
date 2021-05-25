require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";
import pubSub from "./pubsub";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  //ctx means http context and web socket context
  context: async (ctx) => {
    //if http request exist or not
    if (ctx.req) {
      return { loggedInUser: await getUser(ctx.req.headers.token) }; //http header;
    } else {
      //websocket
      const {
        connection: { context },
      } = ctx;
      return { loggedInUser: context.loggedInUser };
    }
  },
  // Authenticating user on the websocket by onConnect
  subscriptions: {
    //read http header to get a token
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      // loading logged in user
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});
const app = express();
app.use(logger("tiny"), graphqlUploadExpress());
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer); // able to socket programming
httpServer.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}/graphql`);
});
