import React, { useEffect, useState, createContext, useContext } from 'react';
import requestLocationPermission from '../../utils/LocationPermission';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

const useLocation = (): GeoCoordinates | null => {
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

    Geolocation.getCurrentPosition(
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

type LocationProviderProps = {
  children: React.ReactNode;
};

const LocationContext = createContext<GeoCoordinates | null>(null);

const useLocationProvider = (): GeoCoordinates | null => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationProvider must be used within a LocationProvider');
  }
  return context;
};

const LocationProvider = ({ children }: LocationProviderProps): JSX.Element => {
  const provideLocation = useLocation();
  return <LocationContext.Provider value={provideLocation}>{children}</LocationContext.Provider>;
};

export { LocationProvider, useLocationProvider };
