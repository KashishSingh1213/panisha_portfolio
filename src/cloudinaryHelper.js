export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "admin_upload"); // MUST match Cloudinary Dashboard preset

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dogcwx8ih/image/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const err = await response.json();
        console.error("Cloudinary upload error:", err);
        throw new Error(err.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Return just the URL
};
