export const dynamic = "force-dynamic";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error("Invalid email or password");
          }

          const user = await User.findOne({ email: credentials?.email });

          if (user && (await user.matchPassword(credentials?.password))) {
            return user;
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (error) {
          if (error instanceof Error)
            throw new Error("Invalid email or password");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile, credentials }) {
      try {
        if (!credentials) {
          await connectDB();

          const user = await User.findOne({ email: profile?.email });

          if (!user) {
            await User.create({
              name: profile?.name,
              email: profile?.email,
              googleId: account?.providerAccountId,
            });
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session, account }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (user) {
        token.provider = account?.provider;
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.picture,
          provider: token.provider,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
