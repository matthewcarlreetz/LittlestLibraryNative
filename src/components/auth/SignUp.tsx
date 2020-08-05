import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../common/Background';
import Logo from '../common/Logo';
import Header from '../common/Header';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import BackButton from '../common/BackButton';
import { emailValidator, passwordValidator } from '../../utils/validators';
import { useTheme } from 'react-native-paper';
import { goBack } from '../navigation';
import useAuth from '../../hooks/auth/useAuth';

type Props = {
  componentId: string;
};

const SignUp = ({ componentId }: Props): JSX.Element => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const { signUp, ...theRest } = useAuth();

  console.log({ theRest });

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    signUp(email.value, password.value);
  };

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    label: {
      color: colors.text,
    },
    button: {
      marginTop: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    link: {
      fontWeight: 'bold',
      color: colors.primary,
    },
  });

  return (
    <Background>
      <BackButton goBack={() => goBack(componentId)} />

      <Logo nativeID="logoSignup" />

      <Header>Create Account</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => goBack(componentId)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(SignUp);
