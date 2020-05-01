import * as React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

type OkDialogProps = {
  visible: boolean;
  title: string;
  onDismiss: () => void;
  body: string;
};

const OkDialog = ({ visible, title, onDismiss, body }: OkDialogProps): JSX.Element => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{body}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default OkDialog;
