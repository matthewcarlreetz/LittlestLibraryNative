/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import LibraryMap from './components/home/LibraryMap.tsx';
import LibraryList from './components/home/LibraryList.tsx';

Navigation.registerComponent('LibraryMap', () => LibraryMap);
Navigation.registerComponent('List', () => LibraryList);
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
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
          {
            stack: {
              id: 'LIST_TAB',
              children: [
                {
                  component: {
                    name: 'List',
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
        ],
      },
    },
  });
});
