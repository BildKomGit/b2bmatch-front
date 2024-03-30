import NextAuth from "next-auth";

declare module "next-auth"  {
  interface Session {
    user: {
      name: string,
      picture: string,
      updated_at: string,
      email: string,
      email_verified: boolean,
      iss: string,
      aud: string,
      iat: string,
      exp: string,
      sub: string
    };
  }
}
