import client from "./db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const {handlers,signIn,signOut,auth} = NextAuth({
  adapter:MongoDBAdapter(client),
  providers: [GitHub({
    clientId:process.env.AUTH_GITHUB_ID!,
    clientSecret:process.env.AUTH_GITHUB_SECRET!,

  })],
  session:{strategy:"jwt"},       //here we are assiging a session with the strategy of JWT when the user is signed.
  secret:process.env.AUTH_SECRET!,
  callbacks:{
async jwt({token,user}){   //here this user info is available and stored in the token as soon as the user is signed in or loggedin
      if(user){
       token.id=user.id.toString(); //this user came from our mongodb adapter and its id is in objectId form and as soon as the user is logged in we store this user's id as the token id.
        token.name=user.name;
        token.email=user.email;
      }
      return token;
    }
    ,
    async session({session,token}){
      if(token){
        session.user.id=token.id as string ;   //then we can retrieve that stored id from token using the session.
        session.user.name=token.name as string;
        session.user.email=token.email as string;
      }
      return session;
    } ,

    


  }
})

