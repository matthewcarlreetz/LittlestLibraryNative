/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import HomeScreen from './components/home/HomeScreen.tsx';

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});
