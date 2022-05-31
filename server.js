require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import {graphqlUploadExpress} from "graphql-upload";
import express from "express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
/*import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import logger from "morgan";*/
//토큰을 수동으로 가져오지 않고 ==> token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNjAwNjQ0fQ.7QlrNaCQ4DYHbwNXroIwN3tJrUIz2HYsZJg9rf68Piw"
const PORT=process.env.PORT;

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({req }) => {
            return {
                loggedInUser : await getUser(req.headers.token),
            }
        },
    });

    await server.start();
    const app = express();
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });
    await new Promise((func) => app.listen({ port: PORT }, func));
    console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
}
startServer();