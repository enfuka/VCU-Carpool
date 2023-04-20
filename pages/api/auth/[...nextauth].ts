import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export default NextAuth({
  // secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }

        const query =
          "SELECT user_id as id, first_name as name, email, password FROM `Users` WHERE email=?";
        const values = [email];

        const endpoint = `${process.env.NEXTAUTH_URL}/api/query`;
        const res = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ query, values }),
          headers: { "Content-Type": "application/json" },
        });

        const userArr = await res.json();
        const user = userArr[0];
        console.log(user);
        console.log(user.password);
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
});
