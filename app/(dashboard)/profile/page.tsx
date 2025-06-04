"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { ProfileImageUpload } from "@/components/profile-image-upload"
import { Save, ArrowLeft, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileData {
    name: string
    username: string
    email?: string
    phone?: string
    profileImageUrl?: string
}

export default function ProfilePage() {
    const { data: session, update } = useSession()
    const { toast } = useToast()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploadingImage, setIsUploadingImage] = useState(false)

    const [profileData, setProfileData] = useState<ProfileData>({
        name: "",
        username: "",
        email: "",
        phone: "",
        profileImageUrl: "",
    })

    useEffect(() => {
        if (session?.user) {
            const user = session.user as any // Type assertion untuk mengatasi error
            setProfileData({
                name: user.name || "",
                username: user.username || "",
                email: user.email || "",
                phone: user.phone || "",
                profileImageUrl: user.profileImageUrl || "",
            })
        }
    }, [session])

    const handleSave = async () => {
        try {
            setIsLoading(true)

            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to update profile")
            }

            const updatedUser = await response.json()

            // Force session update
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: updatedUser.name,
                    username: updatedUser.username,
                    email: updatedUser.email || "",
                    phone: updatedUser.phone || "",
                    profileImageUrl: updatedUser.profileImageUrl || "",
                },
            })

            // Force refresh to update UI
            router.refresh()

            setIsEditing(false)
            toast({
                title: "Profile updated",
                description: "Your profile has been successfully updated.",
            })
        } catch (error: any) {
            console.error("Failed to update profile:", error)
            toast({
                title: "Error",
                description: error.message || "Failed to update profile. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        if (session?.user) {
            const user = session.user as any // Type assertion untuk mengatasi error
            setProfileData({
                name: user.name || "",
                username: user.username || "",
                email: user.email || "",
                phone: user.phone || "",
                profileImageUrl: user.profileImageUrl || "",
            })
        }
        setIsEditing(false)
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    // Helper untuk mendapatkan profile image URL dengan type safety
    const getProfileImageUrl = () => {
        const user = session?.user as any
        return user?.profileImageUrl || ""
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
                        <p className="text-muted-foreground">Manage your account settings and preferences</p>
                    </div>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Profile Picture Section */}
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={getProfileImageUrl() || "/placeholder.svg"} alt={profileData.name} />
                            <AvatarFallback className="text-lg">
                                {profileData.name ? getInitials(profileData.name) : <User className="h-8 w-8" />}
                            </AvatarFallback>
                        </Avatar>

                        {isEditing && (
                            <div className="flex-1">
                                <Label className="text-sm font-medium">Profile Picture</Label>
                                <div className="mt-2">
                                    <ProfileImageUpload
                                        onUploadComplete={(imageUrl) => {
                                            setProfileData({ ...profileData, profileImageUrl: imageUrl })
                                            setIsUploadingImage(false)
                                        }}
                                        onUploadStart={() => setIsUploadingImage(true)}
                                        onUploadError={() => setIsUploadingImage(false)}
                                        currentImageUrl={profileData.profileImageUrl}
                                        onRemoveImage={() => setProfileData({ ...profileData, profileImageUrl: "" })}
                                        disabled={isUploadingImage}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                disabled={!isEditing}
                                placeholder="Optional"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                disabled={!isEditing}
                                placeholder="Optional"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2">
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={isLoading || isUploadingImage || !profileData.name.trim() || !profileData.username.trim()}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Role Information */}
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="flex justify-between">
                            <span className="font-medium">Role:</span>
                            <span className="capitalize">{session?.user?.role}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Account Created:</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
