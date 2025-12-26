export const uploadToCloudinary = async (file, resourceType = 'auto') => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "admin_upload"); // MUST match Cloudinary Dashboard preset

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/dogcwx8ih/${resourceType}/upload`,
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

export const uploadWithProgress = (file, resourceType = 'auto', onProgress) => {
    return new Promise((resolve, reject) => {
        const url = `https://api.cloudinary.com/v1_1/dogcwx8ih/${resourceType}/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "admin_upload");

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                const percentComplete = Math.round((e.loaded / e.total) * 100);
                if (onProgress) onProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                resolve(data.secure_url);
            } else {
                try {
                    const error = JSON.parse(xhr.responseText);
                    reject(new Error(error.error?.message || "Upload failed"));
                } catch (e) {
                    reject(new Error("Upload failed with status " + xhr.status));
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network error during upload"));
        };

        xhr.open("POST", url, true);
        xhr.send(formData);
    });
};
