"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })
        router.push(callbackUrl)
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="rounded-full bg-primary p-3 mb-4">
            <div className="rounded-full bg-secondary p-2 w-16 h-16 flex items-center justify-center">
              <span className="font-bold text-secondary-foreground text-2xl">SB</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center">SavoryBananas</h1>
          <p className="text-muted-foreground text-center mt-1">Banana Chips Order Management</p>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the order management system
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-input"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full font-medium" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">© 2023 SavoryBananas. All rights reserved.</p>
      </div>
    </div>
  )
}
