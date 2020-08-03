import { Navigation } from 'react-native-navigation';

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            component: {
              name: 'SignIn',
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Sign In',
                  // icon: require('./signin.png'),
                },
              },
            },
          },
          {
            component: {
              name: 'SignUp',
              options: {
                bottomTab: {
                  text: 'Sign Up',
                  fontSize: 12,
                  // icon: require('./signup.png'),
                },
              },
            },
          },
        ],
      },
    },
  });

const HomeTabs = {
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
              icon: require('../../assets/baseline_list_black_36pt.png'),
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
              icon: require('../../assets/baseline_explore_black_36pt.png'),
              selectedIconColor: 'black',
              iconColor: 'lightgray',
            },
          },
        },
      },
    ],
  },
};

export const goHome = () =>
  Navigation.setRoot({
    root: HomeTabs,
  });
