/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButtonText } from './types';
import styles, { COLOR_ACTIVE_SOFT } from '../../../assets/styles/global';
import TextAtom from '../text/TextAtom';
import { TouchableOpacity } from 'react-native';

const ButtonTextAtom = ({title, uppercase, textColor = '#fff', fontWeight = 'normal', bgColor = COLOR_ACTIVE_SOFT, paddingX = 0, paddingY = 0, rounded = 0, action}: IPropsButtonText) => {

  return (
    <TouchableOpacity style={{
        backgroundColor: bgColor,
        paddingHorizontal: paddingX,
        paddingVertical: paddingY,
        borderRadius: rounded,
      }}
      onPress={action}
    >
      <TextAtom
        color={textColor}
        value={title}
        fontWeight={fontWeight}
        textTransform={uppercase ? 'uppercase' : 'none'}
      />
    </TouchableOpacity>
);
};

export default ButtonTextAtom;
