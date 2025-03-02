import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import User from "@/models/user";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            // scope: 'profile'
        })
    ],
    callbacks:{
        async session({session}) {
            const sessionUser = await User.findOne({email: session.user.email})
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({profile}) {
            // every next.js route is a serverless route
            try {
                await connectToDB()
                // check if the user exists in db 
                const userExists = await User.findOne({email: profile.email})
                if(userExists){
                    console.log('user exists');
                }
                // if notFound, create new user 
                if(!userExists){
                    console.log('user does not exist');
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ','').toLowerCase(),
                        image:profile.picture
                    },
                )
                    console.log('new user created');
                }
                return true
            } catch (error) {
                console.log(error);
                return false;
            }
            
        }
    }
    
})

export {handler as GET, handler as POST}