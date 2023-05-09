import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { useSession } from "next-auth/react";

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

        const endpoint1 = `${process.env.NEXTAUTH_URL}/api/query`;
        const res1 = await fetch(endpoint1, {
          method: "POST",
          body: JSON.stringify({ query, values }),
          headers: { "Content-Type": "application/json" },
        });

        const endpoint2 = `${process.env.NEXTAUTH_URL}/api/auth/isadmin`;
        const res2 = await fetch(endpoint2, {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });

        var isAdmin = false;
        const adminArr = await res2.json();
        if (adminArr[0].cnt === 1) {
          isAdmin = true;
        }

        console.log("isAdmin:", isAdmin);

        const userArr = await res1.json();
        const user = userArr[0];
        console.log("userLogin:", user);
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid email or password");
        }
        user.image = isAdmin;
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
});
