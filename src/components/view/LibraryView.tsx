import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Library } from 'models/library';
import { Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import OpenMap from 'react-native-open-map';

type ViewLibraryProps = {
  library: Library;
};

const ViewLibrary = ({
  library: { image, address, city, state, latitude, longitude },
}: ViewLibraryProps): JSX.Element => {
  const win = Dimensions.get('window');

  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <FastImage source={{ uri: image }} style={{ width: win.width, height: win.width, marginBottom: 24 }} />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{address}</Text>
        <Text>{`${city}, ${state}`}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          style={{ width: '50%', alignSelf: 'center', justifyContent: 'center' }}
          contentStyle={{ height: 60 }}
          labelStyle={{ fontSize: 20, color: 'white' }}
          mode="contained"
          onPress={(): void => {
            OpenMap.show({
              latitude,
              longitude,
              title: 'Littlest Library',
              cancelText: 'Close',
              actionSheetTitle: 'Chose app',
              actionSheetMessage: 'Available applications ',
            });
          }}
        >
          Get Directions
        </Button>
      </View>
    </View>
  );
};

ViewLibrary.options = {
  topBar: {
    title: {
      text: '',
    },
  },
};

export default ViewLibrary;
