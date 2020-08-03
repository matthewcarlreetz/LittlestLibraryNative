import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { goToAuth, goHome } from './navigation';
import useAuth from '../hooks/auth/useAuth';

const Initializing = (): JSX.Element => {
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) goToAuth();
    if (!!user) goHome();
  }, [user]);
  return (
    <SafeAreaView>
      <Text>Initializing</Text>
    </SafeAreaView>
  );
};

export default Initializing;
