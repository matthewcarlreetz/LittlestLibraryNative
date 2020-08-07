import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Library } from '../../models';
import { getUrl } from '../../utils/Images';
import haversine from '../../utils/haversine';
import { GeoCoordinates } from 'react-native-geolocation-service';

export type LibraryWithData = Library & { distance: number | undefined; imageUrl: string };

const useGetLibraries = (coords: GeoCoordinates | null) => {
  const [libraries, setLibraries] = useState<LibraryWithData[]>([]);

  const libsWithDistanceAndUrl = async (libs: Library[]) =>
    await Promise.all(
      libs.map(async (l) => {
        let imageUrl = '';
        if (l.avatar) {
          imageUrl = (await getUrl(l.avatar)) as string;
        }
        let distance: number | undefined = undefined;
        if (coords) {
          distance = haversine(l.latitude, l.longitude, coords.latitude, coords.longitude);
        }
        return { ...l, distance, imageUrl };
      }),
    );

  useEffect(() => {
    async function getLibraries() {
      const libs = await DataStore.query(Library);
      const libsWithData = await libsWithDistanceAndUrl(libs);
      setLibraries(libsWithData);
    }
    getLibraries();
  }, []);

  return libraries;
};

export default useGetLibraries;
