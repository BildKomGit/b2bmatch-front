import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        if (res.status === 200) {
          const user = await res.json();
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        // Extract relevant details from the decoded JWT payload
        const { name, picture, email, updated_at, email_verified, iss, aud, iat, exp, sub } = jwt.decode(user.id_token);
        // Add the extracted details to the token object
        token.name = name;
        token.picture = picture;
        token.email = email;
        token.updated_at = updated_at;
        token.email_verified = email_verified;
        token.iss = iss;
        token.aud = aud;
        token.iat = iat;
        token.exp = exp;
        token.sub = sub;
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.access_token = token.access_token;
      // Add relevant details from token to the session
      session.user = {
        name: token.name,
        picture: token.picture,
        email: token.email,
        updated_at: token.updated_at,
        email_verified: token.email_verified,
        iss: token.iss,
        aud: token.aud,
        iat: token.iat,
        exp: token.exp,
        sub: token.sub,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
