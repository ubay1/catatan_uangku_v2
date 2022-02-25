import * as React from 'react';
import { Text } from 'react-native';
import { IPropsText } from './types';

const TextAtom = ({value, size = 16, color}: IPropsText) => (
  <Text style={{
    fontSize: size,
    color: color,
  }}>
    {value}
  </Text>
);
export default TextAtom;
