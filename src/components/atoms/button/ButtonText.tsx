import * as React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButton } from './types';

const ButtonText = ({title, action}: IPropsButton) => (
  <Button mode="text" onPress={() => action()}>
    {title}
  </Button>
);

export default ButtonText;
