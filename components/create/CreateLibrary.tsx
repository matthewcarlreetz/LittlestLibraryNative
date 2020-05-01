import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Image as ImageView } from 'react-native';
import { Button } from 'react-native-paper';
import { Image } from 'react-native-image-crop-picker';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIBRARY, Library } from '../../models/library';
import { ReactNativeFile } from 'apollo-absinthe-upload-link';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

type CreateLibraryProps = {
  image: Image;
};

const CreateLibrary = ({ image }: CreateLibraryProps): JSX.Element => {
  const [createLibrary, { error, data, loading }] = useMutation<
    { library: Library },
    { file: string; latitude: number; longitude: number }
  >(CREATE_LIBRARY);

  const [coords, setCoords] = useState<GeoCoordinates | null>(null);

  console.log({ error, data, loading });

  const win = Dimensions.get('window');

  useEffect(() => {
    //reverse geocode
    console.log('coords changed', coords);
  }, [coords]);

  useEffect(() => {
    Geolocation.watchPosition(
      (position) => {
        console.log('set coords to ', position.coords);
        setCoords(position.coords);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
    return (): void => {
      Geolocation.stopObserving();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageView
        source={{ uri: image.path, width: image.width, height: image.height }}
        style={{ width: win.width, height: win.width, resizeMode: 'contain' }}
      />
      <Button
        mode="contained"
        onPress={(): void => {
          createLibrary({
            variables: {
              file:
                new ReactNativeFile({
                  uri: image?.path,
                  name: 'a.jpg',
                  type: 'image/jpeg',
                }) || '',
              latitude: 44.4,
              longitude: -88.2,
            },
          });
        }}
      >
        Send it!
      </Button>
    </View>
  );
};

CreateLibrary.options = {
  topBar: {
    title: {
      text: 'Create Library',
    },
  },
};

export default CreateLibrary;
