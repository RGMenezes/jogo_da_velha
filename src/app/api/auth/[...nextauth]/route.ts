import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import bcrypt from "bcryptjs"
import Database from '@/server/database/DataBase'
import User from '@/server/model/User'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text'},
        password: { label: 'password', type: 'password'}
      },
      async authorize(credentials, req) {
        Database()

        if(!credentials?.email || !credentials?.password ){
          throw new Error("Dados ausentes!");
        }
        
        try {
          const user: any = await User.findOne({email: credentials?.email})
                        
          if(!user){
            throw new Error("Esta conta não exite!");
          };

          const match = await bcrypt.compare(credentials?.password, user.password)

          if(match){
            return user
          }else{
            throw new Error("Senha incorreta!")
          }
        } catch (err) {
          return err
        }
      },
    })
  ],
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(nextAuthOptions)

export {handler as GET, handler as POST}