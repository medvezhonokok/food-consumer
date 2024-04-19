import imageCompression from "browser-image-compression";

export const compressImage = async (file) => {
    const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };

    try {
        return await imageCompression(file, options);
    } catch (error) {
        console.error("Error compressing image:", error);
        return file;
    }
};