import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    username: string
    role: string
    email?: string
    phone?: string
    profileImageUrl?: string
  }

  interface Session {
    user: {
      id: string
      username: string
      role: string
      email?: string
      phone?: string
      profileImageUrl?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    role: string
    email?: string
    phone?: string
    profileImageUrl?: string
  }
}
