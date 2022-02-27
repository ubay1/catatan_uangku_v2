import React from 'react';
import { Button } from 'react-native-paper';
import TextAtom from '../text/TextAtom';
import { IPropsButtonWithIcon } from './types';

const ButtonIconAtom = ({title, mode = 'contained', icon, uppercase, color, disabled, theme, action, textColor = '#fff'}: IPropsButtonWithIcon) => (
  <Button
    icon={icon}
    uppercase={uppercase}
    color={color}
    mode={mode}
    disabled={disabled}
    theme={theme}
    onPress={() => action()}
    // contentStyle
    // style
  >
    <TextAtom
      color={textColor}
      value={title}
      textTransform={uppercase ? 'uppercase' : 'none'}
    />
  </Button>
);

export default ButtonIconAtom;
