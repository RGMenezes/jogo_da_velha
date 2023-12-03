import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import Database from "@api/database/DataBase"

import User from "@api/model/User"


interface UserType{
  userName: string;
  email: string;
  password: string;
  wage: number;
  theme ?: boolean;
}

const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials: {email: string, password: string}) {
                const {email, password} = credentials
                
                return new Promise((resolve, reject) => {
                    Database()

                    User.findOne({email: email}).then((user: UserType) => {
                        
                        if(!user){
                            reject("Esta conta não exite!");
                        };
                        bcrypt.compare(password, user.password, (err, match) => {
                            if(match){
                                resolve(user);
                            }else{
                                reject("Senha incorreta!");
                            };
                        });
            
                    }).catch((err: string) => {
                        reject("Erro ao carregar o usuário!");
                    });
                }).then((res) => {
                    return res;
                }).catch((err) => {
                    throw new Error(err);
                });
            }
        })
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: '/home',
        signOut: '/',
        error: '/'
    },
    callbacks: {
        async session({session, token, user}){
            session.user.id = token.sub;
            return session;
        }
    },
    useSecureCookies: process.env.COOKIES
    
};

export default authOptions;