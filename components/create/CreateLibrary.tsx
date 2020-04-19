import React from 'react';
import { StyleSheet, ImageBackground, View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIBRARY, LibraryData, LibraryVars, Library } from '../../models/library';

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

const image = { uri: 'https://reactjs.org/logo-og.png' };

const CreateLibrary = (): JSX.Element => {
  const [createLibrary] = useMutation(CREATE_LIBRARY);

  const win = Dimensions.get('window');

  const captureImage = (): void => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(async (image) => {
      console.log(image);
      const response = await createLibrary({
        variables: {
          file: image,
          latitude: 44.4,
          longitude: -88.2,
        },
      });
    });
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={captureImage}>
        Capture Library
      </Button>
      {/* <ImageBackground source={image} style={styles.image} imageStyle={{ width: win.width, height: win.width }}>
        <Button style={styles.text}>Inside</Text>
      </ImageBackground> */}
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
