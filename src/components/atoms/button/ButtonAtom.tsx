/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButton } from './types';
import styles from '../../../assets/styles/global';
import TextAtom from '../text/TextAtom';
import { Pressable } from 'react-native';

const ButtonAtom = ({title, size, fontWeight, uppercase, bgColor, disabled, action, textColor = '#fff', marginX = 20, marginY = 0}: IPropsButton) => {

  return (
    <Pressable
      style={{...styles.button,
        backgroundColor: bgColor,
        marginHorizontal: marginX,
        marginVertical: marginY, paddingVertical: 5,
        width: '100%',
        alignItems: 'center',
      }}
      disabled={disabled}
      onPress={action}
    >
      <TextAtom
        size={size}
        color={textColor}
        fontWeight={fontWeight}
        value={title}
        textTransform={uppercase ? 'uppercase' : 'none'}
      />
    </Pressable>
);
};

export default ButtonAtom;
