import * as React from 'react';
import { Text as TextRN } from 'react-native';
import { IPropsText } from './types';

const Text = ({value, size}: IPropsText) => (
  <TextRN style={{
    fontSize: size,
  }}>
    {value}
  </TextRN>
);
export default Text;
