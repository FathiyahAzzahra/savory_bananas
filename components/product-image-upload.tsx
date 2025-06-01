"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { uploadImageToCloudinary, validateImageFile } from "@/lib/cloudinary"

interface ProductImageUploadProps {
    onUploadComplete: (imageUrl: string) => void
    onUploadStart?: () => void
    onUploadError?: (error: string) => void
    disabled?: boolean
    currentImageUrl?: string
    onRemoveImage?: () => void
}

export function ProductImageUpload({
    onUploadComplete,
    onUploadStart,
    onUploadError,
    disabled = false,
    currentImageUrl,
    onRemoveImage,
}: ProductImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()
    const [uploadProgress, setUploadProgress] = useState(0);


    const handleFileSelect = async (file: File) => {
        if (disabled || isUploading) return;

        const validationError = validateImageFile(file);
        if (validationError) {
            toast({
                title: "File tidak valid",
                description: validationError,
                variant: "destructive",
            });
            onUploadError?.(validationError);
            return;
        }

        setIsUploading(true);
        onUploadStart?.();
        setUploadProgress(0); // tambahkan state uploadProgress di komponen

        try {
            const imageUrl = await uploadImageToCloudinary(file, (percent) => {
                setUploadProgress(percent);
            });

            if (imageUrl) {
                onUploadComplete(imageUrl);
                toast({
                    title: "Upload berhasil",
                    description: "Gambar produk berhasil diupload",
                });
            } else {
                throw new Error("Failed to upload image");
            }
        } catch (error) {
            const errorMessage = "Gagal mengupload gambar. Silakan coba lagi.";
            toast({
                title: "Upload gagal",
                description: errorMessage,
                variant: "destructive",
            });
            onUploadError?.(errorMessage);
        } finally {
            setIsUploading(false);
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (disabled || isUploading) return

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            handleFileSelect(files[0])
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled && !isUploading) {
            setDragActive(true)
        }
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length > 0) {
            handleFileSelect(files[0])
        }
    }

    const handleButtonClick = () => {
        if (!disabled && !isUploading) {
            fileInputRef.current?.click()
        }
    }

    const handleRemoveImage = () => {
        onRemoveImage?.()
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <div className="space-y-4">
            <Label>Gambar Produk</Label>

            {currentImageUrl ? (
                <Card>
                    <CardContent className="p-4">
                        <div className="relative">
                            <img
                                src={currentImageUrl || "/placeholder.svg"}
                                alt="Gambar produk"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2"
                                onClick={handleRemoveImage}
                                disabled={disabled}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Gambar produk berhasil diupload</p>
                    </CardContent>
                </Card>
            ) : (
                <Card
                    className={`border-2 border-dashed transition-colors cursor-pointer ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
                        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleButtonClick}
                >
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center space-y-3">
                            {isUploading ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    <p className="text-sm text-muted-foreground">Mengupload gambar...</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                        <div
                                            className="bg-primary h-2.5 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{uploadProgress}%</p>
                                </>
                            ) : (
                                <>
                                    <div className="rounded-full bg-muted p-3">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Upload gambar produk</p>
                                        <p className="text-xs text-muted-foreground mt-1">Drag & drop atau klik untuk memilih</p>
                                        <p className="text-xs text-muted-foreground">Format: JPEG, PNG, WebP (Max: 5MB)</p>
                                    </div>
                                    <Button variant="outline" size="sm" disabled={disabled}>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Pilih Gambar
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileInputChange}
                className="hidden"
                disabled={disabled || isUploading}
            />
        </div>
    )
}
