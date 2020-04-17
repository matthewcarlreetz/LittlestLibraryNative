import React from 'react';
import { useNavigationButtonPress } from 'react-native-navigation-hooks';
import { useQuery } from '@apollo/react-hooks';
import { GET_LIBRARIES, LibraryData, LibraryVars, Library } from '../../models/library';
import { FlatList } from 'react-native';
import { List, Divider, Avatar, useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';

const LibraryList = (): JSX.Element => {
  const { data: { nearbyLibraries } = { nearbyLibraries: [] } } = useQuery<LibraryData, LibraryVars>(GET_LIBRARIES, {
    variables: { latitude: 44.4, longitude: -88.2 },
  });

  useNavigationButtonPress((e) => {
    console.log(`Pressed ${e.buttonId} on componentId: ${e.componentId}`);
  });

  const renderItem = (data: { item: Library }): JSX.Element => {
    return (
      <List.Item
        title={data.item.address}
        description="Item description"
        left={(props): JSX.Element => (
          <Avatar.Image
            {...props}
            source={{
              uri:
                'https://bloximages.chicago2.vip.townnews.com/auburnpub.com/content/tncms/assets/v3/editorial/5/80/580e1e82-e642-50f5-bd71-674207d79b2e/558d79d6d7ad7.image.jpg',
            }}
          />
        )}
      />
    );
  };

  const { colors } = useTheme();
  const safeArea = useSafeArea();

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: colors.background,
        paddingBottom: safeArea.bottom,
      }}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      keyExtractor={(library: Library): string => library.id.toString()}
      data={nearbyLibraries}
    />
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
