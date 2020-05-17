import React, { useEffect } from 'react';
import { useNavigationButtonPress } from 'react-native-navigation-hooks';
import { useQuery } from '@apollo/react-hooks';
import { GET_LIBRARIES, LibraryData, GetLibrariesVars, Library } from '../../models/library';
import { FlatList } from 'react-native';
import { List, Divider, useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { Navigation } from 'react-native-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import requestLocationPermission from '../../utils/LocationPermission';

type LibraryListScreenProps = {
  componentId: string;
};

const LibraryList = ({ componentId }: LibraryListScreenProps): JSX.Element => {
  const { data: { nearbyLibraries } = { nearbyLibraries: [] } } = useQuery<LibraryData, GetLibrariesVars>(
    GET_LIBRARIES,
    {
      variables: { latitude: 44.4, longitude: -88.2 },
    },
  );

  useNavigationButtonPress((e) => {
    ImagePicker.openCamera({
      width: 1242,
      height: 1242,
      cropping: true,
    }).then(async (image) => {
      if (image) {
        Navigation.showModal({
          component: {
            name: 'CreateLibrary',
            passProps: {
              image,
            },
          },
        });
      }
    });
  });

  useEffect(() => {
    (async (): Promise<void> => {
      await requestLocationPermission();
    })();
  }, []);

  const renderItem = (data: { item: Library }): JSX.Element => {
    return (
      <List.Item
        title={data.item.address}
        description="Item description"
        onPress={(): void => {
          Navigation.push(componentId, {
            component: {
              name: 'LibraryView',
              passProps: { library: data.item },
            },
          });
        }}
        left={({ style, ...props }): JSX.Element => (
          <FastImage
            {...props}
            style={{ ...style, width: 80, height: 80, borderRadius: 40 }}
            source={{
              uri: data.item.thumbnail,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
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
        text: 'Add',
      },
    ],
  },
};

export default LibraryList;
