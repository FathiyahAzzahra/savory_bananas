export interface CloudinaryUploadResult {
    secure_url: string
    public_id: string
    [key: string]: any
}

export const uploadImageToCloudinary = (
    file: File,
    onProgress?: (percent: number) => void
): Promise<string | null> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dm0brovfk";
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "lginmk6z";

    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
                const percent = Math.round((event.loaded / event.total) * 100);
                onProgress(percent);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response.secure_url);
            } else {
                reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));

        xhr.send(formData);
    });
};


export const validateImageFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
        return "File harus berupa gambar (JPEG, PNG, atau WebP)"
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
        return "Ukuran file tidak boleh lebih dari 5MB"
    }

    return null
}
