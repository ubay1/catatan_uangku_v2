/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import TextAtom from '../text/TextAtom';
import { IPropsButtonWithIcon } from './types';
import styles, { COLOR_ACTIVE } from '../../../assets/styles/global';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';


const ButtonIconAtom = ({icon, color, disabled, action, size, iconColor = '#fff'}: IPropsButtonWithIcon) => (
  <Pressable
    style={{
      backgroundColor: color,
      padding: 5,
      borderRadius: 5,
    }}
    disabled={disabled}
    onPress={()=> action()}
  >
    <IconMCI
      name={icon}
      size={size}
      color={iconColor}
    />
  </Pressable>

  // <Button
  //   icon={icon}
  //   uppercase={uppercase}
  //   color={color}
  //   mode={mode}
  //   disabled={disabled}
  //   theme={theme}
  //   onPress={() => action()}
  //   // contentStyle
  //   // style
  // >
  //   <TextAtom
  //     color={textColor}
  //     value={title}
  //     textTransform={uppercase ? 'uppercase' : 'none'}
  //   />
  // </Button>
);

export default ButtonIconAtom;
