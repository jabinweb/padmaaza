import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "./lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          referralCode: user.referralCode,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists with this email
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email as string },
            include: { accounts: true },
          })

          if (existingUser) {
            // Check if this Google account is already linked
            const existingAccount = existingUser.accounts.find(
              acc => acc.provider === "google" && acc.providerAccountId === account.providerAccountId
            )

            if (!existingAccount) {
              // Link the Google account to existing user
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                },
              })
            }

            // Update user info from Google if name is missing
            if (!existingUser.name && user.name) {
              await prisma.user.update({
                where: { id: existingUser.id },
                data: { name: user.name },
              })
            }
          }
        } catch (error) {
          console.error("Error during Google sign-in:", error)
          return false
        }
      }
      return true
    },

    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.referralCode = (user as any).referralCode
      }

      // Handle session update trigger
      if (trigger === "update" && session) {
        console.log("JWT update trigger:", session)
        if (session.user?.name) token.name = session.user.name
        if (session.user?.referralCode) token.referralCode = session.user.referralCode

        // Fetch updated user data from database
        try {
          const updatedUser = await prisma.user.findUnique({
            where: { email: token.email as string },
            select: { id: true, name: true, role: true, referralCode: true },
          })

          if (updatedUser) {
            token.id = updatedUser.id
            token.name = updatedUser.name
            token.role = updatedUser.role
            token.referralCode = updatedUser.referralCode
          }
        } catch (error) {
          console.error("Error fetching updated user data:", error)
        }
      }

      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "ADMIN" | "MEMBER" | "CUSTOMER"
        session.user.referralCode = token.referralCode as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  events: {
    async signOut(message) {
      console.log("User signed out:", message)
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})