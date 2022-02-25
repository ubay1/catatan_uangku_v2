import * as React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButtonWithIcon } from './types';

const ButtonIconAtom = ({title, mode = 'contained', icon, uppercase, color, disabled, theme, action}: IPropsButtonWithIcon) => (
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
    {title}
  </Button>
);

export default ButtonIconAtom;
