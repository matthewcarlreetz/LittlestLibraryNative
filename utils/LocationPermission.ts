import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';

export default async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'LittlestLibrary',
      message: 'LittlestLibrary App access to your location ',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return true;
    } else {
      console.log('location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
