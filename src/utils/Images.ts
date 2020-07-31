import { Storage } from 'aws-amplify';

const uploadToStorage = async (fileKey: string, pathToImageFile: string) => {
  try {
    const response = await fetch(pathToImageFile);

    const blob = await response.blob();

    Storage.put(fileKey, blob, {
      contentType: 'image/jpeg',
    });
  } catch (err) {
    console.log(err);
  }
};

export { uploadToStorage };
