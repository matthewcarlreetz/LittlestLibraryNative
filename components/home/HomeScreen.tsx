import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const HomeScreen = (): Element => (
  <>
    <SafeAreaView>
      <Text>Hello React Native Navigation</Text>
    </SafeAreaView>
  </>
);

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Littlest Library',
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
};

export default HomeScreen;
