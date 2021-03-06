import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigationButtonPress } from 'react-native-navigation-hooks';
import { useQuery } from '@apollo/react-hooks';
import { GET_LIBRARIES, LibraryData, LibraryVars } from '../../models/library';

type LibraryMapScreenProps = {
  componentId: string;
};

// Leaving this here for future reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LibraryMapScreen = ({ componentId }: LibraryMapScreenProps): JSX.Element => {
  const { data: { nearbyLibraries } = { nearbyLibraries: [] } } = useQuery<LibraryData, LibraryVars>(GET_LIBRARIES, {
    variables: { latitude: 44.4, longitude: -88.2 },
  });

  useNavigationButtonPress((e) => {
    console.log(`Pressed ${e.buttonId} on componentId: ${e.componentId}`);
  });

  return (
    <SafeAreaView>
      <Text>Map</Text>
      {nearbyLibraries.map((l) => {
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
