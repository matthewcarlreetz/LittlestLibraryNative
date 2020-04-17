/**
 * @format
 */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import LibraryMap from './components/home/LibraryMap.tsx';
import LibraryList from './components/home/LibraryList.tsx';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graph' }),
  cache: new InMemoryCache(),
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(91,196,180)',
    secondary: 'yellow',
    accent: 'yellow',
  },
};

const asdf = (Component) => () => (props) => (
  <ApolloProvider client={client}>
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Component {...props} />
      </PaperProvider>
    </SafeAreaProvider>
  </ApolloProvider>
);

Navigation.registerComponent('LibraryMap', asdf(LibraryMap), () => LibraryMap);
Navigation.registerComponent('LibraryList', asdf(LibraryList), () => LibraryList);

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
        ],
      },
    },
  });
});