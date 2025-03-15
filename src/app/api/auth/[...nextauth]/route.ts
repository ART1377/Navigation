import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/db/db";
import Credentials from "next-auth/providers/credentials";
import type { Adapter } from "next-auth/adapters";
import { comparePassword } from "@/app/lib/utils/bcrypt/bcrypt";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const password = credentials?.password as string;
        const email = credentials?.email as string;

        let user = null;
        // logic to verify if the user exists
        user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !credentials?.password) return null;

        const isValidPassword = await comparePassword(password, user.password!);
        if (!isValidPassword) {
          return null;
        }

        // بازگرداندن کاربر با نوع مناسب
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
