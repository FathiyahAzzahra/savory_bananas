"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, X, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProfileImageUploadProps {
    onUploadComplete: (imageUrl: string) => void
    onUploadStart?: () => void
    onUploadError?: () => void
    currentImageUrl?: string
    onRemoveImage?: () => void
    disabled?: boolean
}

export function ProfileImageUpload({
    onUploadComplete,
    onUploadStart,
    onUploadError,
    currentImageUrl,
    onRemoveImage,
    disabled = false,
}: ProfileImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast({
                title: "Invalid file type",
                description: "Please select an image file (JPG, PNG, etc.)",
                variant: "destructive",
            })
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "Please select an image smaller than 5MB",
                variant: "destructive",
            })
            return
        }

        try {
            setIsUploading(true)
            setUploadProgress(0)
            onUploadStart?.()

            const formData = new FormData()
            formData.append("file", file)
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => Math.min(prev + 10, 90))
            }, 200)

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                },
            )

            clearInterval(progressInterval)

            if (!response.ok) {
                throw new Error("Upload failed")
            }

            const data = await response.json()
            setUploadProgress(100)

            setTimeout(() => {
                onUploadComplete(data.secure_url)
                setIsUploading(false)
                setUploadProgress(0)
            }, 500)

            toast({
                title: "Profile image uploaded",
                description: "Your profile image has been successfully uploaded.",
            })
        } catch (error) {
            console.error("Upload error:", error)
            setIsUploading(false)
            setUploadProgress(0)
            onUploadError?.()
            toast({
                title: "Upload failed",
                description: "Failed to upload profile image. Please try again.",
                variant: "destructive",
            })
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemoveImage = () => {
        onRemoveImage?.()
        toast({
            title: "Profile image removed",
            description: "Your profile image has been removed.",
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={currentImageUrl || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback>
                        <User className="h-8 w-8" />
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col space-y-2">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={disabled || isUploading}
                    />

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleUploadClick}
                        disabled={disabled || isUploading}
                        className="w-fit"
                    >
                        {isUploading ? (
                            <>
                                <Upload className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Camera className="mr-2 h-4 w-4" />
                                {currentImageUrl ? "Change Photo" : "Upload Photo"}
                            </>
                        )}
                    </Button>

                    {currentImageUrl && !isUploading && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveImage}
                            disabled={disabled}
                            className="w-fit text-red-600 hover:text-red-700"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Remove Photo
                        </Button>
                    )}
                </div>
            </div>

            {isUploading && (
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Uploading profile image...</span>
                        <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            <p className="text-sm text-muted-foreground">
                Recommended: Square image, at least 200x200 pixels. Max file size: 5MB.
            </p>
        </div>
    )
}
