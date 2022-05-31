require('dotenv').config();
import { ApolloServer} from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT
const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            //token: req.headers.token,
            loggedInUser: await getUser(req.headers.token),
            //토큰을 수동으로 가져오지 않고 ==> token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNjAwNjQ0fQ.7QlrNaCQ4DYHbwNXroIwN3tJrUIz2HYsZJg9rf68Piw"
            // context를 통해서 헤더 리퀘스트에 있는 토큰 정보를 자동으로 가져옴
          //  protectResolver,
        };
    },
});

server
    .listen(PORT)
    .then(() => console.log(`Server in running on http://localshost:${PORT}`));