import * as React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButton } from './types';

const ButtonOutlined = ({title, action}: IPropsButton) => (
  <Button mode="outlined" onPress={() => action()}>
    {title}
  </Button>
);

export default ButtonOutlined;
