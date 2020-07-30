import React from 'react';
import { Navigation } from 'react-native-navigation';
import LibraryMap from './src/components/home/LibraryMap.tsx';
import LibraryList from './src/components/home/LibraryList.tsx';
import CreateLibrary from './src/components/create/CreateLibrary.tsx';
import LibraryView from './src/components/view/LibraryView.tsx';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GOOGLE_LOCATION_API_KEY } from 'react-native-dotenv';
import Geocoder from 'react-native-geocoding';
import { LocationProvider } from './src/hooks/useLocation';
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

Geocoder.init(GOOGLE_LOCATION_API_KEY);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(91,196,180)',
    secondary: 'yellow',
    accent: 'yellow',
  },
};

const ViewWrapper = (Component) => () => (props) => (
  <LocationProvider>
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Component {...props} />
      </PaperProvider>
    </SafeAreaProvider>
  </LocationProvider>
);

Navigation.registerComponent('LibraryMap', ViewWrapper(LibraryMap), () => LibraryMap);
Navigation.registerComponent('LibraryList', ViewWrapper(LibraryList), () => LibraryList);
Navigation.registerComponent('CreateLibrary', ViewWrapper(CreateLibrary), () => CreateLibrary);
Navigation.registerComponent('LibraryView', ViewWrapper(LibraryView), () => LibraryView);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'LIST_TAB',
              children: [
                {
                  component: {
                    name: 'LibraryList',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./assets/baseline_list_black_36pt.png'),
                  selectedIconColor: 'black',
                  iconColor: 'lightgray',
                },
              },
            },
          },
          {
            stack: {
              id: 'MAP_TAB',
              children: [
                {
                  component: {
                    name: 'LibraryMap',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./assets/baseline_explore_black_36pt.png'),
                  selectedIconColor: 'black',
                  iconColor: 'lightgray',
                },
              },
            },
          },
        ],
      },
    },
  });
});
