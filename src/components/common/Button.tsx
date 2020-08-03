import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton>;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

const Button = ({ mode, style, children, ...props }: Props) => {
  const { colors } = useTheme();
  return (
    <PaperButton
      style={[styles.button, mode === 'outlined' && { backgroundColor: colors.surface }, style]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

export default memo(Button);
