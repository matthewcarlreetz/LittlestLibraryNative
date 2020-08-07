import React from 'react';
import { useNavigationButtonPress } from 'react-native-navigation-hooks';
import { FlatList, Text, View } from 'react-native';
import { List, Divider, useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { Navigation } from 'react-native-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import useLocation from '../../hooks/utils/useLocation';
import useGetLibraries, { LibraryWithData } from '../../hooks/libraries/useGetLibraries';
import { Library } from '../../models';

type LibraryListScreenProps = {
  componentId: string;
};

const KM_TO_MILES = 0.621371;

const LibraryList = ({ componentId }: LibraryListScreenProps): JSX.Element => {
  const coords = useLocation();
  const libraries = useGetLibraries(coords);

  console.log(JSON.stringify({ libraries }, null, 2));

  useNavigationButtonPress(() => {
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

  const renderItem = (data: { item: LibraryWithData }): JSX.Element => {
    return (
      <List.Item
        title={data.item.address}
        description={`${data.item.city}, ${data.item.state}`}
        onPress={(): void => {
          Navigation.push(componentId, {
            component: {
              name: 'LibraryView',
              passProps: { library: data.item },
              options: {
                bottomTabs: {
                  visible: false,
                },
              },
            },
          });
        }}
        right={(props): JSX.Element => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {data.item.distance && <Text {...props}>{`${(data.item.distance * KM_TO_MILES).toFixed(1)} mi`}</Text>}
          </View>
        )}
        left={({ style, ...props }): JSX.Element => (
          <FastImage
            {...props}
            style={{ ...style, width: 80, height: 80, borderRadius: 40 }}
            source={{
              uri: data.item.imageUrl ?? '',
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
      data={libraries}
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
