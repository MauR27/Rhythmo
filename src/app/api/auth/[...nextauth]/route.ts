import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "romgaller@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials, req) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });

        if (user && (await user.mathPassword(credentials?.password))) {
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log("JWT callback:", { trigger, token, user, session });
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.picture,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
