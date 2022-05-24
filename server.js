require('dotenv').config();
import { ApolloServer} from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
    schema,
});
const PORT = process.env.PORT
server
    .listen(PORT)
    .then(() => console.log(`Server in running on http://localshost:${PORT}`));