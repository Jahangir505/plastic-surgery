import bcrypt from "bcrypt";
import { connectToDatabase } from "libs/mongodb";
import NextAuth from "next-auth";
import jwt from "jsonwebtoken"; // Import JWT library
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const { db } = await connectToDatabase();
          const usersCollection = db.collection("users");

          // Find the user with the provided email
          const user = await usersCollection.findOne({ email });
          if (user && (await bcrypt.compare(password, user.password))) {
            
            // If the passwords match, generate a JWT token
            const token = jwt.sign(
              { sub: user._id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: "1d" } // Set your preferred expiration time
            );

            return {
              ...user,
              token, // Include the JWT token in the returned user object
            };
          }

          // If user is not found or password doesn't match, return null
          return null;
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw new Error(`Authentication failed: ${error.message}`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log({token,user});
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      // console.log({session,token});
      session.user = token.user
      return session
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async signIn({ user, account, profile }) {
      return true
    },
  },

  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});