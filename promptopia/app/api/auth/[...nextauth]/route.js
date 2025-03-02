import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            // scope: 'profile'
        })
    ],
    async session({session}) {
        
    },
    async signIn({profile}) {
        // every next.js route is a serverless route
        try {
            await connectToDB()
            // check if the user exists in db 

            // if notFound, create new user 
            
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }
})

export {handler as GET, handler as POST}