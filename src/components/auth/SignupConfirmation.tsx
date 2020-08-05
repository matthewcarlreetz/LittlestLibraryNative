import React, { memo, useState, useEffect } from 'react';
import TextInput from '../common/TextInput';
import useAuth from '../../hooks/auth/useAuth';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { emailValidator } from '../../utils/validators';
import { goHome } from '../navigation';

type Props = { visible: boolean; email: string; onCancel: () => void };
const SignupConfirmation = ({ visible, email: emailProp, onCancel }: Props): JSX.Element => {
  const [code, setCode] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [email, setEmail] = useState({ value: emailProp, error: '' });
  const { confirmSignUp, resendConfirmationCode } = useAuth();

  useEffect(() => {
    setEmail({ ...email, value: emailProp });
  }, [emailProp]);

  const emailValid = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return false;
    }
    return true;
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => {}}>
        <Dialog.Title>Confirm Your Account</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Check your email for your confirmation code</Paragraph>
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
            label="Confirmation Code"
            value={code}
            onChangeText={(text: string) => setCode(text)}
            autoCapitalize="none"
          />
          <Button
            disabled={confirming}
            onPress={async () => {
              if (emailValid()) {
                setConfirming(true);
                const success = await confirmSignUp(email.value, code);
                setConfirming(success);
                if (success) {
                  goHome();
                }
              }
            }}
          >
            Confirm
          </Button>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button
            disabled={confirmationSent}
            onPress={() => {
              if (emailValid()) {
                resendConfirmationCode(email.value);
                setConfirmationSent(true);
              }
            }}
          >
            Resend
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default memo(SignupConfirmation);
