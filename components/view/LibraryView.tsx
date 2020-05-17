import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { Library } from 'models/library';
import FastImage from 'react-native-fast-image';
type ViewLibraryProps = {
  library: Library;
};

const ViewLibrary = ({ library: { image } }: ViewLibraryProps): JSX.Element => {
  const win = Dimensions.get('window');

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <FastImage source={{ uri: image }} style={{ width: win.width, height: win.width }} />
      </View>
    </ScrollView>
  );
};

ViewLibrary.options = {
  topBar: {
    title: {
      text: 'Create Library',
    },
  },
};

export default ViewLibrary;
