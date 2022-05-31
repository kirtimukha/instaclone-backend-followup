import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { getUser } from "../users.utils";

export default {
    Mutation: {
        editProfile: async (
            _,
            { firstName, lastName, username, email, password: newPassword },
            { loggedInUser }
            //resolver 는 4개의 args를 가짐 ( root, 내가 쓰는 args, context, info)
            // context에 넣는 것은 모든 resolver에서 접근할 수 있음 context === { token }
        ) => {
            console.log(loggedInUser);
           // protectResolver(loggedInUser);
            //1~6을 매번 할 수 없으니 이 내용을 아폴로서버 context 에
            //logg{loggedInUser: getUser에 넣고 사용함 === 리졸버 컨텍스트 자리에 {loggedInUser }를 넣어 대체
            //1  [[ const { id } = await jwt.verify(token, process.env.SECRET_KEY);]] 2~6을 1로 대체
            //2 const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
            //3 console.log(verifiedToken);
            //4 await jwt.verify(token, process.env.SECRET_KEY)의 결과값 형태
            //5 => { id: 1, iat: 1653600644 }
            //6 const { id } 는  verifiedToken 결과값 오브젝트를 열어서 그 안의 id를 꺼내 쓴다는 뜻임

            let uglyPassword = null;
            if (newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            const updatedUser = await client.user.update({
                where: {
                    id: loggedInUser.id
                }, // id가 로그인 한 유저의 id를 찾음
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    ...(uglyPassword && { password: uglyPassword }),
                },

            });
            if (updatedUser.id) {
                return {
                    ok: true,
                }
            } else {
                return {
                    ok: false,
                    error : "Could not update profile.",
                }
            }
        },
    },
};