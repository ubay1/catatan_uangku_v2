import * as React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButtonWithIcon } from './types';

const ButtonIconStandar = ({title, icon, action}: IPropsButtonWithIcon) => (
  <Button icon={icon} mode="contained" onPress={() => action()}>
    {title}
  </Button>
);

export default ButtonIconStandar;
