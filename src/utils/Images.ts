import { Storage } from 'aws-amplify';
import aws4 from 'react-native-aws4';
import awsExports from '../../aws-exports';
import { ICredentials } from '@aws-amplify/core';

function getS3SignedHeaders(path: string, credentials: ICredentials) {
  const url = new URL(path);

  const opts = {
    region: awsExports.aws_user_files_s3_bucket_region,
    service: 's3',
    method: 'GET',
    host: url.hostname,
    path: `${url.pathname}${url.search}`,
  };

  return aws4.sign(opts, credentials).headers;
}

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
    return false;
  }
};

const getUrl = async (fileKey: string) => {
  try {
    const url = await Storage.get(fileKey, { level: 'public' });
    return url;
  } catch (err) {
    return '';
  }
};

export { upload, getUrl, getS3SignedHeaders };
