import * as React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButtonWithIcon } from './types';

const ButtonIconText = ({title, icon, action}: IPropsButtonWithIcon) => (
  <Button icon={icon} mode="text" onPress={() => action()}>
    {title}
  </Button>
);

export default ButtonIconText;
