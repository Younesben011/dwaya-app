import * as FileSystem from "expo-file-system";
export const uploadImage = async (image: any) => {
    const respond = await FileSystem.uploadAsync(URL + "upload", image, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
    });
    return respond.body;
};
