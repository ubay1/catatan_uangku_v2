import React from 'react';
import {Text, View} from 'react-native';
import {IPropsText} from './types';

const TextAtom = ({
  value,
  mTop = 0,
  mBottom = 0,
  mLeft = 0,
  mRight = 0,
  pHorizontal = 0,
  pVertical = 0,
  size = 16,
  color = '#000',
  bgColor = 'tranparent',
  fontWeight = 'normal',
  textTransform = 'none',
}: IPropsText) => (
  <View style={{backgroundColor: bgColor, marginLeft: mLeft}}>
    <Text
      numberOfLines={1}
      style={{
        fontSize: size,
        color: color,
        fontWeight: fontWeight,
        textTransform: textTransform,
        marginTop: mTop,
        marginBottom: mBottom,
        marginRight: mRight,
        paddingHorizontal: pHorizontal,
        paddingVertical: pVertical,
      }}>
      {value.length > 25 ? value.substring(0, 25) + '...' : value}
    </Text>
  </View>
);
export default TextAtom;
