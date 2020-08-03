import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigationButtonPress } from 'react-native-navigation-hooks';
import useGetLibraries from '../../hooks/libraries/useGetLibraries';

type LibraryMapScreenProps = {
  componentId: string;
};

// Leaving this here for future reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LibraryMapScreen = ({ componentId }: LibraryMapScreenProps): JSX.Element => {
  const { libraries } = useGetLibraries();

  useNavigationButtonPress((e) => {
    console.log(`Pressed ${e.buttonId} on componentId: ${e.componentId}`);
  });

  return (
    <SafeAreaView>
      <Text>Map</Text>
      {libraries.map((l) => {
        return <Text key={l.id}>{l.address}</Text>;
      })}
    </SafeAreaView>
  );
};

LibraryMapScreen.options = {
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

export default LibraryMapScreen;
