import prisma from "@/utils/prisma";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
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
          },
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
