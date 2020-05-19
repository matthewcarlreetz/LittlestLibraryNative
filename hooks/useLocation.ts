import { useEffect, useState } from 'react';
import requestLocationPermission from '../utils/LocationPermission';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

export default (): GeoCoordinates | null => {
  const [coords, setCoords] = useState<GeoCoordinates | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean>(false);

  useEffect(() => {
    (async (): Promise<void> => {
      const locationPermission = await requestLocationPermission();
      setHasLocationPermission(locationPermission);
    })();
  }, []);

  useEffect(() => {
    if (!hasLocationPermission) return;

    Geolocation.watchPosition(
      (position) => {
        setCoords(position.coords);
      },
      (error) => {
        console.error(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
    return (): void => {
      Geolocation.stopObserving();
    };
  }, [hasLocationPermission]);
  return coords;
};
