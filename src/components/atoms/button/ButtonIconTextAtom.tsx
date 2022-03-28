/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import TextAtom from '../text/TextAtom';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {IPropsButtonWithIconText} from './types';

const ButtonIconTextAtom = ({
  title = '',
  icon,
  uppercase,
  iconColor,
  disabled,
  size = 23,
  textSize,
  action,
  textColor = '#fff',
  bgColor = '#fff',
  borderColor = '#000',
  borderWidth = 0,
  rounded = 5,
}: IPropsButtonWithIconText) => (
  <TouchableOpacity
    // icon={icon}
    // uppercase={uppercase}
    // color={color}
    disabled={disabled}
    onPress={() => action()}
    style={{
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderWidth: borderWidth,
      borderRadius: rounded,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }}>
    <IconMCI name={icon} size={16} color={iconColor} />
    <TextAtom
      color={textColor}
      value={title}
      textTransform={uppercase ? 'uppercase' : 'none'}
      size={textSize}
    />
  </TouchableOpacity>
);

export default ButtonIconTextAtom;
