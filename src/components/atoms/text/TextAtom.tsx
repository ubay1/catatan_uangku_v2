import * as React from 'react';
import { Text } from 'react-native';
import { IPropsText } from './types';

const TextAtom = ({value, size = 16, color = '#000', fontWeight = 'normal', textTransform = 'none'}: IPropsText) => (
  <Text style={{
    fontSize: size,
    color: color,
    fontWeight: fontWeight,
    textTransform: textTransform,
  }}>
    {value}
  </Text>
);
export default TextAtom;
