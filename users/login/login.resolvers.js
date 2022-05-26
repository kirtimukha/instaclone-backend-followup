import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import client from "../../client";

export default {
    Mutation: { // mutation에서는 항상  export default {mutation: } 을 해주어야 한다.
        login: async( _, {username, password } ) =>
        {
            // [login mutation - Whole prosess]
            //1. find user with args.username
            //2. check password with args.password
            //3. issue a token and send it to the user

            // [step1] find user with args.username
            const user = await client.user.findFirst( {where: { username } } );
           // if( !user ) {
            if(!user ) {
                return {
                    ok: false,
                    error: "user not found.",
                };
            }

            // [step2] check password with args.password
            const passwordOk = await bcrypt.compare(password, user.password);
            if( !passwordOk ) {
                return {
                    ok: false,
                    error: "Incorrect password.",
                };
            }
            // [step3] issue a token and send it to the user
            // token은 서버가 프론트엔드에 연결되어 있지 않거나, 
            // 프론트엔드가 서버가 연결되어 있지만 다른 지역의 서버, 물리적으로 다른 서버에 있을 때(?) 사용함
            // cookie 와 세션은 서버와 프론트엔드가 같은 곳에 있을 때 사용하기 적합함
            // jwt.sign(payload, secretOrPrivateKey, [options, callback]) // sign(서명) == issue(발행)
            // payload 는  우리가? 토큰에 넣게 되는 것 
            // secretOrPrivateKey 서버가 서명==발행하는 것
            // token 에는 비밀정보를 넣으면 안됨 // 토큰 안의 내용은 다른 사람들이 볼 수 있음
            // token 발행 목적은 토큰 안에 정보를 넣고  토큰이 우리가 싸인했던 토큰인지 확인하는 것임
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            }
        },
    },
};