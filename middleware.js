export { default } from "next-auth/middleware";
// export default NextAuth(authConfig).auth;
// import NextAuthConfig from "./next-auth";

// export default NextAuthConfig.auth;

export const config = { matcher: ["/management/:path*", "/management/user"] };
