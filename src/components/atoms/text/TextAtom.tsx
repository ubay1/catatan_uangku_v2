import React from 'react';
import { Text } from 'react-native';
import { IPropsText } from './types';

const TextAtom = ({value, mTop = 0, mBottom = 0, size = 16, color = '#000', fontWeight = 'normal', textTransform = 'none'}: IPropsText) => (
  <Text style={{
    fontSize: size,
    color: color,
    fontWeight: fontWeight,
    textTransform: textTransform,
    marginTop: mTop,
    marginBottom: mBottom,
  }}>
    {value}
  </Text>
);
export default TextAtom;
