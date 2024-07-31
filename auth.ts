import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { IUser, User, IUserWithId } from "./models/userModel";
import {compare} from "bcryptjs";
import { connectToDB } from "./lib/dbConnect";
 

export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email", 
            type: "email",
          },
          password: { 
            label: "Password", 
            type: "password",
          }
        },
        authorize: async(credentials) => {
          const email = credentials.email as string | undefined;
          const password = credentials.password as string;
  
          if(!email || !password){
            throw new CredentialsSignin({cause: "Invalid input provided"});
          }
  
          await connectToDB();
          const user = await User.findOne({email}).select("+password") as IUserWithId;
          if(!user)
            throw new CredentialsSignin({cause: "Invalid email provided"});
  
          if(!user.password)
            throw new CredentialsSignin({cause: "Invalid credential provided"});
          
          const passMatch = await compare(password, user.password);
          if(!passMatch) {
            throw new CredentialsSignin({
              cause: "Password is not valid",
            });
          }
          return { name: user.name, email: user.email, id: user._id };
        }
      })
    ],
    pages: {
      signIn: '/auth/login'
    },
    callbacks: {
      signIn: async ({user, account}: {user: any, account: any}) => {
        if(account?.provider === 'google'){
          try{
            const {email, name, id, image} = user;
            await connectToDB();
            const userExists = await User.findOne({email});
            if(!userExists){
              await User.create({email, googleId: id});
            }
            
            return true;
          }
          catch(err){
            throw new AuthError("Error while signing in with Google");
          }
        }
  
        return false;
      }
    }
  }
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
