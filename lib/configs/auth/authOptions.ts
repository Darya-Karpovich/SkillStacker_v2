import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import prisma from "@/utils/prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const isUser = await prisma.user.findUnique({
        where: { email: user?.email ?? undefined },
      });
      if (!isUser && user?.email) {
        await prisma.user.create({
          data: {
            email: user?.email,
            name: user?.name,
            id: Number(user?.id),
          },
        });
      }
      return true;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub,
      };
      return session;
    },
  },
};
