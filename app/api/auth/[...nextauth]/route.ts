import NextAuth, { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        await dbConnect()

        try {
          const user = await User.findOne({ username: credentials.username })

          if (!user) {
            return null
          }

          const isPasswordValid = await user.comparePassword(credentials.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            name: user.name,
            username: user.username,
            role: user.role,
            email: user.email || "",
            phone: user.phone || "",
            profileImageUrl: user.profileImageUrl || "",
          } as any
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userData = user as any
        token.id = userData.id
        token.name = userData.name
        token.username = userData.username
        token.role = userData.role
        token.email = userData.email
        token.phone = userData.phone
        token.profileImageUrl = userData.profileImageUrl
      }

      // Refresh user data on every token refresh
      if (token.id) {
        try {
          await dbConnect()
          const refreshedUser = await User.findById(token.id).select("-password")
          if (refreshedUser) {
            token.name = refreshedUser.name
            token.username = refreshedUser.username
            token.email = refreshedUser.email || ""
            token.phone = refreshedUser.phone || ""
            token.profileImageUrl = refreshedUser.profileImageUrl || ""
          }
        } catch (error) {
          console.error("Error refreshing user data:", error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        ; (session.user as any) = {
          id: token.id as string,
          name: token.name as string,
          username: token.username as string,
          role: token.role as string,
          email: token.email as string,
          phone: token.phone as string,
          profileImageUrl: token.profileImageUrl as string,
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
