import { Navigation } from 'react-native-navigation';

export const goBack = (componentId: string) => Navigation.pop(componentId);

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Home.Stack',
        options: {
          topBar: { visible: false },
        },
        children: [
          {
            component: {
              name: 'Login',
            },
          },
        ],
      },
    },
  });

//TODO: Create shared element transition
export const goToSignUp = (componentId: string) => {
  Navigation.push(componentId, {
    component: {
      name: 'SignUp',
    },
  });
};

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
