import React, { memo, useState } from 'react';
import TextInput from '../common/TextInput';
import useAuth from '../../hooks/auth/useAuth';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

type Props = { visible: boolean; email: string };
const SignupConfirmation = ({ visible, email }: Props): JSX.Element => {
  const [code, setCode] = useState('');
  const { confirmSignUp } = useAuth();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => {}}>
        <Dialog.Title>Confirm Your Account</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Check your email for you confirmation code</Paragraph>
          <TextInput
            label="Confirmation Code"
            value={code}
            onChangeText={(text: string) => setCode(text)}
            autoCapitalize="none"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              confirmSignUp(email, code);
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default memo(SignupConfirmation);
