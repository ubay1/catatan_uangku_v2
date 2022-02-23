import * as React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButtonWithIcon } from './types';

const ButtonIconOutlined = ({title, icon, action}: IPropsButtonWithIcon) => (
  <Button icon={icon} mode="outlined" onPress={() => action()}>
    {title}
  </Button>
);

export default ButtonIconOutlined;
