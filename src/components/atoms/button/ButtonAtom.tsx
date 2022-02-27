/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButton } from './types';
import styles from '../../../assets/styles/global';
import TextAtom from '../text/TextAtom';

const ButtonAtom = ({title, mode = 'contained', uppercase, color, disabled, theme, action, textColor = '#fff', marginX = 20, marginY = 0}: IPropsButton) => {

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
      style={{...styles.button, marginHorizontal: marginX}}
    >
      <TextAtom
        color={textColor}
        value={title}
        textTransform={uppercase ? 'uppercase' : 'none'}
      />
    </Button>
);
};

export default ButtonAtom;
