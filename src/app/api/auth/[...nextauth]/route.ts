import NextAuth, { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

// Define the user type if needed, otherwise use NextAuth types.
type UserRole = "STUDENT" | "TEACHER";

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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
        };
      }
    })
    // Add OAuth providers here if needed (Google, etc)
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user && user.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: Record<string, unknown> }) {
      if (token?.role && session.user) {
        (session.user as NextAuthUser & { role?: UserRole }).role = token.role as UserRole;
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