import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        // HARDCODED LOGIN FOR TESTING ONLY
        if (
          credentials?.email === "animesh@gmail.com" &&
          credentials?.password === "12345678"
        ) {
          return {
            id: "static-id-1",
            name: "Animesh",
            email: "animesh@gmail.com",
            role: "STUDENT",
          };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
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