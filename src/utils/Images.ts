import { Storage } from 'aws-amplify';

const upload = async (fileKey: string, pathToImageFile: string) => {
  try {
    const response = await fetch(pathToImageFile);

    const blob = await response.blob();

    await Storage.put(fileKey, blob, {
      contentType: 'image/jpeg',
      level: 'public',
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getUrl = async (fileKey: string) => {
  try {
    const url = await Storage.get(fileKey, { level: 'public' });
    console.log({ imageUrl: url });
    return url;
  } catch (err) {
    console.log(err);
    return '';
  }
};
export { upload, getUrl };
