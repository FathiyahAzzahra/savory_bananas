import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorize() called with:", credentials)

        if (!credentials?.username || !credentials?.password) {
          console.log("Missing credentials")
          throw new Error("Please provide username and password")
        }

        await dbConnect()
        console.log("Connected to DB")

        const user = await User.findOne({ username: credentials.username })
        console.log("User from DB:", user)

        if (!user) {
          console.log("No user found")
          throw new Error("Invalid username or password")
        }

        const isPasswordValid = await user.comparePassword(credentials.password)
        console.log("Password valid:", isPasswordValid)

        if (!isPasswordValid) {
          throw new Error("Invalid username or password")
        }

        console.log("Login successful, returning user object")
        return {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          role: user.role,
        }
      },

    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.role = token.role as string
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
