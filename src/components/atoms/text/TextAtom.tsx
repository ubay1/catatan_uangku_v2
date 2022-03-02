import React from 'react';
import {Text} from 'react-native';
import {IPropsText} from './types';

const TextAtom = ({
  value,
  size = 16,
  textAlign = 'left',
  color = '#000',
  fontWeight = 'normal',
  textTransform = 'none',
  bgColor = 'transparent',
  mLeft = 0,
  mRight = 0,
  mTop = 0,
  mBottom = 0,
  pHorizontal = 0,
  pVertical = 0,
}: IPropsText) => (
  <Text
    style={{
      fontSize: size,
      color: color,
      fontWeight: fontWeight,
      textTransform: textTransform,
      backgroundColor: bgColor,
      marginLeft: mLeft,
      marginRight: mRight,
      marginTop: mTop,
      marginBottom: mBottom,
      paddingHorizontal: pHorizontal,
      paddingVertical: pVertical,
      textAlign: textAlign,
    }}>
    {value}
  </Text>
);
export default TextAtom;
