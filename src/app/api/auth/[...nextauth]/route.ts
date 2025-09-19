import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import type { JWT } from "next-auth/jwt";

// Custom app user type to satisfy type checker
interface AppUser extends User {
  role: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;
        // Cast as AppUser to satisfy type checker
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        } as AppUser;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // user is AppUser | undefined
      if (user && "role" in user && user.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role && session.user) {
        (session.user as typeof session.user & { role?: string }).role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };