// next-auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsJson = process.env.CREDENTIALS_JSON;
const credentialsObject = JSON.parse(credentialsJson);

export default NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // Check if credentialsObject has a "users" array
        if (
          !credentialsObject ||
          !credentialsObject.users ||
          !Array.isArray(credentialsObject.users)
        ) {
          throw new Error("Invalid credentials format");
        }

        // Use find if credentialsObject.users is an array, otherwise set user to null
        const user =
          credentialsObject.users.find(
            (cred) => cred.email === email && cred.password === password
          ) || null;

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: "/management" // Change this URL as needed
  },
  secret: process.env.NEXTAUTH_SECRET
});
