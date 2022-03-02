/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import TextAtom from '../text/TextAtom';
import {IPropsButtonWithIcon} from './types';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonIconAtom = ({
  icon,
  size = 22,
  borderColor = '#000',
  borderWidth = 0,
  color,
  disabled,
  action,
  bgColor = '#fff',
  rounded = 5,
}: IPropsButtonWithIcon) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={() => action()}
    style={{
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderWidth: borderWidth,
      borderRadius: rounded,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
    <IconMCI name={icon} size={size} color={color} />
  </TouchableOpacity>
);

export default ButtonIconAtom;
