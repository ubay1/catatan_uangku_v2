/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {IPropsTextInput} from './types';
import styles from '../../../assets/styles/global';

const TextInputAtom = ({
  label,
  value,
  theme,
  mode = 'flat',
  onChangeText,
  keyboardType = 'default',
  placeholderTextColor = '#000',
  marginX = 20,
  marginY = 5,
  height = 50,
  value,
}: IPropsTextInput) => {
  return (
    <TextInput
      style={{
        ...styles.input,
        marginHorizontal: marginX,
        marginVertical: marginY,
      }}
      value={value}
      mode={mode}
      label={label}
      theme={theme}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export default TextInputAtom;
