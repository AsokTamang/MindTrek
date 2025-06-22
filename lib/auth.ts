import client from "./db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const authOptions = NextAuth({
  adapter:MongoDBAdapter(client),
  providers: [GitHub({
    clientId:process.env.AUTH_GITHUB_ID!,
    clientSecret:process.env.AUTH_GITHUB_SECRET!,

  })],
  session:{strategy:"jwt"},       //here we are assiging a session with the strategy of JWT when the user is signed.
  secret:process.env.AUTH_SECRET!,
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.id=user.id  ;
        token.username=user.name;
      }
      return token;
    } ,

    async session({session,token}){
      if(token){
        session.user.id=token.id as string;
        session.user.username=token.username as string;
      }
      return session;
    }


  }
})

