import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../common/Background';
import Logo from '../common/Logo';
import Header from '../common/Header';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { emailValidator, passwordValidator } from '../../utils/validators';
import { useTheme } from 'react-native-paper';
import { goToSignUp, goHome } from '../navigation';
import useAuth from '../../hooks/auth/useAuth';
import SignupConfirmation from './SignupConfirmation';

type Props = {
  componentId: string;
};

const Login = ({ componentId }: Props): JSX.Element => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    label: {
      color: colors.text,
    },
    link: {
      fontWeight: 'bold',
      color: colors.primary,
    },
  });

  const { signIn, needsConfirmation, reset, loading, user } = useAuth();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    signIn(email.value, password.value);
  };

  useEffect(() => {
    if (user) {
      goHome();
    }
  }, [user]);

  return (
    <Background>
      <SignupConfirmation email={email.value} visible={needsConfirmation} onCancel={reset} />

      <Logo nativeID="logoLogin" />

      <Header>Welcome.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: '' })}
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
        onChangeText={(text: string) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => goToSignUp(componentId)}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={onLoginPressed}
        disabled={loading || email.value.length < 5 || password.value.length < 6}
      >
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => goToSignUp(componentId)}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(Login);
