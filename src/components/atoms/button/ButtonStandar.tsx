import * as React from 'react';
import { Button } from 'react-native-paper';
import { IPropsButton } from './types';

const ButtonStandar = ({title, action}: IPropsButton) => (
  <Button mode="contained" onPress={() => action()}>
    {title}
  </Button>
);

export default ButtonStandar;
