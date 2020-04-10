import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigationButtonPress } from 'react-native-navigation-hooks';

const LibraryList = (): JSX.Element => {
  useNavigationButtonPress((e) => {
    console.log(`Pressed ${e.buttonId} on componentId: ${e.componentId}`);
  });
  return (
    <SafeAreaView>
      <Text>ListView</Text>
    </SafeAreaView>
  );
};

LibraryList.options = {
  topBar: {
    title: {
      text: 'Littlest Library',
    },
    rightButtons: [
      {
        id: 'Add',
        systemItem: 'add',
      },
    ],
  },
};

export default LibraryList;
