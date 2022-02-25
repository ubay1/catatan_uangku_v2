/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButton } from './types';
import styles from '../../../assets/styles/global';
import TextAtom from '../text/TextAtom';

const ButtonAtom = ({title, mode = 'contained', uppercase, color, disabled, theme, action}: IPropsButton) => {

return (
  <Button
    uppercase={uppercase}
    color={color}
    mode={mode}
    disabled={disabled}
    theme={theme}
    onPress={action}
    contentStyle={{
      paddingVertical: 5,
    }}
    style={styles.button}
  >
    <TextAtom
      color="#fff"
      value={title}
    />
  </Button>
)};

export default ButtonAtom;
