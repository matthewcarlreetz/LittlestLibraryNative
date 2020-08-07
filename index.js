import React from 'react';
import { Navigation } from 'react-native-navigation';
import LibraryMap from './src/components/home/LibraryMap.tsx';
import LibraryList from './src/components/home/LibraryList.tsx';
import CreateLibrary from './src/components/create/CreateLibrary.tsx';
import LibraryView from './src/components/view/LibraryView.tsx';
import Intializing from './src/components/Initializing.tsx';
import SignUp from './src/components/auth/SignUp.tsx';
import SignIn from './src/components/auth/SignIn.tsx';
import Login from './src/components/auth/Login.tsx';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GOOGLE_LOCATION_API_KEY } from 'react-native-dotenv';
import Geocoder from 'react-native-geocoding';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { MemoryStorageNew } from './src/utils/StorageService.ts';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

Amplify.configure({ ...config, storage: MemoryStorageNew });

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
  <SafeAreaProvider>
    <PaperProvider theme={theme}>
      <Component {...props} />
    </PaperProvider>
  </SafeAreaProvider>
);

Navigation.registerComponent('LibraryMap', ViewWrapper(LibraryMap), () => LibraryMap);
Navigation.registerComponent('LibraryList', ViewWrapper(LibraryList), () => LibraryList);
Navigation.registerComponent('CreateLibrary', ViewWrapper(CreateLibrary), () => CreateLibrary);
Navigation.registerComponent('LibraryView', ViewWrapper(LibraryView), () => LibraryView);
Navigation.registerComponent('Initializing', ViewWrapper(Intializing), () => Intializing);
Navigation.registerComponent('SignIn', ViewWrapper(SignIn), () => SignIn);
Navigation.registerComponent('SignUp', ViewWrapper(SignUp), () => SignUp);
Navigation.registerComponent('Login', ViewWrapper(Login), () => Login);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing',
      },
    },
  });
});
